package com.dongnv.movie_website.mapper;

import com.dongnv.movie_website.dto.request.UploadMovieRequest;
import com.dongnv.movie_website.dto.response.MovieResponse;
import com.dongnv.movie_website.entity.Movie;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MovieMapper {

    Movie toMovie(UploadMovieRequest request);

    MovieResponse toMovieResponse(Movie movie);
}
