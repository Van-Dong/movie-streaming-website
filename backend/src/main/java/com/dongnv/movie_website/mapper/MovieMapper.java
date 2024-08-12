package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.dongnv.movie_website.dto.request.movie.UploadMovieRequest;
import com.dongnv.movie_website.dto.response.MovieResponse;
import com.dongnv.movie_website.entity.Movie;

@Mapper(componentModel = "spring")
public interface MovieMapper {

    @Mapping(source = "private", target = "isPrivate")
    Movie toMovie(UploadMovieRequest request);

    @Mapping(source = "private", target = "isPrivate")
    MovieResponse toMovieResponse(Movie movie);

    @Mapping(source = "private", target = "private")
    void updatedMovie(@MappingTarget Movie movie, UploadMovieRequest request);
}
