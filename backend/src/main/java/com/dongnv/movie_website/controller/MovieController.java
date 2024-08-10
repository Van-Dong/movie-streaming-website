package com.dongnv.movie_website.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.UploadMovieRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.MovieResponse;
import com.dongnv.movie_website.service.AwsS3Service;
import com.dongnv.movie_website.service.MovieService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/movies")
public class MovieController {
    MovieService movieService;
    AwsS3Service awsS3Service;

    @PostMapping("/uploadMovie")
    ApiResponse<MovieResponse> uploadMovie(@Valid UploadMovieRequest request) {
        return ApiResponse.<MovieResponse>builder()
                .result(movieService.uploadNewMovie(request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteMovie(@PathVariable String id) {
        movieService.deleteMovie(id);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping
    ApiResponse<List<MovieResponse>> getAllMovies() {
        return ApiResponse.<List<MovieResponse>>builder()
                .result(movieService.getAllMovies())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<MovieResponse> getMovie(@PathVariable String id) {
        return ApiResponse.<MovieResponse>builder()
                .result(movieService.getMovie(id))
                .build();
    }

    @GetMapping("/s3/all")
    ApiResponse<List<String>> getMoviesInS3() {
        return ApiResponse.<List<String>>builder()
                .result(movieService.getAllObjectsInS3())
                .build();
    }
}
