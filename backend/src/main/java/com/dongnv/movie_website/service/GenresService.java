package com.dongnv.movie_website.service;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dongnv.movie_website.dto.request.movie.GenreRequest;
import com.dongnv.movie_website.dto.response.GenreResponse;
import com.dongnv.movie_website.entity.Genres;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.GenresMapper;
import com.dongnv.movie_website.repository.GenresRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class GenresService {
    GenresRepository genresRepository;
    GenresMapper genresMapper;

    public GenreResponse createGenre(GenreRequest request) {
        Genres c = genresMapper.toCategory(request);
        try {
            genresRepository.save(c);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.GENRE_EXISTED);
        }

        return genresMapper.toCategoryResponse(c);
    }

    public List<GenreResponse> getGenres(String query, int page, int size) {
        List<Genres> categories =
                genresRepository.findAllByNameLike(query, PageRequest.of(page, size, Sort.by("name")));
        return categories.stream().map(genresMapper::toCategoryResponse).toList();
    }

    public GenreResponse updateGenre(long id, GenreRequest request) {
        Genres c = genresRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.GENRE_NOT_EXISTED));

        genresMapper.updateCategory(c, request);
        genresRepository.save(c);
        return genresMapper.toCategoryResponse(c);
    }

    public void deleteGenre(long id) {
        genresRepository.deleteById(id);
    }
}
