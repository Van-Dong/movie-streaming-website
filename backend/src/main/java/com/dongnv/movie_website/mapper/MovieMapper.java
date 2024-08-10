package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;

import com.dongnv.movie_website.dto.request.UploadMovieRequest;
import com.dongnv.movie_website.dto.response.MovieResponse;
import com.dongnv.movie_website.entity.Movie;

@Mapper(componentModel = "spring")
public interface MovieMapper {

    Movie toMovie(UploadMovieRequest request);

    MovieResponse toMovieResponse(Movie movie);
}
