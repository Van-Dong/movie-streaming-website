package com.dongnv.movie_website.service;

import com.dongnv.movie_website.dto.request.DirectorRequest;
import com.dongnv.movie_website.dto.response.DirectorResponse;
import com.dongnv.movie_website.entity.Director;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.DirectorMapper;
import com.dongnv.movie_website.repository.DirectorRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DirectorService {
    DirectorRepository directorRepository;
    DirectorMapper directorMapper;
    AwsS3Service awsS3Service;

    public DirectorResponse createDirector(DirectorRequest request) {
        Director director = directorMapper.toDirector(request);
        if (Objects.nonNull(request.getPortraitFile())) {
            String portraitUrl = awsS3Service.uploadFilePublic(request.getPortraitFile(), request.getName());
            director.setPortraitUrl(portraitUrl);
        }
        directorRepository.save(director);
        return directorMapper.toDirectorResponse(director);
    }

    public List<DirectorResponse> getDirectors(String query, int page, int size) {
        List<Director> directors = directorRepository.findAllByNameLike(query, PageRequest.of(page, size, Sort.by("name")));
        return directors.stream().map(directorMapper::toDirectorResponse).toList();
    }

    public DirectorResponse updateDirector(long id, DirectorRequest request) {
        Director director = directorRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.DIRECTOR_NOT_FOUND)
        );
        directorMapper.updatedDirector(director, request);
        if (Objects.nonNull(request.getPortraitFile())) {
            awsS3Service.deleteByUrl(director.getPortraitUrl());
            String portraitUrl = awsS3Service.uploadFilePublic(request.getPortraitFile(), request.getName());
            director.setPortraitUrl(portraitUrl);
        }

        director = directorRepository.save(director);
        return directorMapper.toDirectorResponse(director);
    }

    public void deleteDirector(long id) {
        directorRepository.deleteById(id);
    }

}
