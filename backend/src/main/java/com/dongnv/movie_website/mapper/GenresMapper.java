package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.dongnv.movie_website.dto.request.CategoryRequest;
import com.dongnv.movie_website.dto.response.CategoryResponse;
import com.dongnv.movie_website.entity.Genres;

@Mapper(componentModel = "spring")
public interface GenresMapper {
    Genres toCategory(CategoryRequest request);

    CategoryResponse toCategoryResponse(Genres genre);

    void updateCategory(@MappingTarget Genres genre, CategoryRequest request);
}
