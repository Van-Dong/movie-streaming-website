package com.dongnv.movie_website.service;

import com.dongnv.movie_website.dto.request.StudioRequest;
import com.dongnv.movie_website.dto.response.StudioResponse;
import com.dongnv.movie_website.entity.Studio;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.StudioMapper;
import com.dongnv.movie_website.repository.StudioRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class StudioService {
    StudioRepository studioRepository;
    StudioMapper studioMapper;

    public StudioResponse createStudio(StudioRequest request) {
        Studio studio = studioMapper.toStudio(request);
        studio = studioRepository.save(studio);
        return studioMapper.toStudioResponse(studio);
    }

    public List<StudioResponse> getStudios(String query, int page, int size) {
        List<Studio> studios = studioRepository.findAllByNameLike(query, PageRequest.of(page, size, Sort.by("name")));
        return studios.stream().map(studioMapper::toStudioResponse).toList();
    }

    public StudioResponse updateStudio(long id, StudioRequest request) {
        Studio studio = studioRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.STUDIO_NOT_FOUND)
        );
        studioMapper.updatedStudio(studio, request);
        studioRepository.save(studio);
        return studioMapper.toStudioResponse(studio);
    }

    public void deleteStudio(long id) {
        studioRepository.deleteById(id);
    }

}
