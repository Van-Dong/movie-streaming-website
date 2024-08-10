package com.dongnv.movie_website.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dongnv.movie_website.dto.request.CategoryRequest;
import com.dongnv.movie_website.dto.response.CategoryResponse;
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

    public CategoryResponse createCategory(CategoryRequest request) {
        if (genresRepository.existsById(request.getName())) throw new AppException(ErrorCode.CATEGORY_EXISTED);
        Genres c = genresMapper.toCategory(request);
        genresRepository.save(c);
        return genresMapper.toCategoryResponse(c);
    }

    public List<CategoryResponse> getCategories(String query, int page, int size) {
        List<Genres> categories =
                genresRepository.findAllByNameLike(query, PageRequest.of(page, size, Sort.by("name")));
        return categories.stream().map(genresMapper::toCategoryResponse).toList();
    }

    public CategoryResponse updateCategory(String name, CategoryRequest request) {
        Genres c = genresRepository.findById(name).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));

        genresMapper.updateCategory(c, request);
        genresRepository.save(c);
        return genresMapper.toCategoryResponse(c);
    }

    public void deleteCategory(String name) {
        genresRepository.deleteById(name);
    }
}
