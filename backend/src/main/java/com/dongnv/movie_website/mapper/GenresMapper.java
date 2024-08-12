package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.dongnv.movie_website.dto.request.movie.GenreRequest;
import com.dongnv.movie_website.dto.response.GenreResponse;
import com.dongnv.movie_website.entity.Genres;

@Mapper(componentModel = "spring")
public interface GenresMapper {
    Genres toCategory(GenreRequest request);

    GenreResponse toCategoryResponse(Genres genre);

    void updateCategory(@MappingTarget Genres genre, GenreRequest request);
}
