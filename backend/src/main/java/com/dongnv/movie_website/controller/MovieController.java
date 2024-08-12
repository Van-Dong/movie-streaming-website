package com.dongnv.movie_website.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.movie.UploadMovieRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.MovieResponse;
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

    @PostMapping("/uploadMovie")
    ApiResponse<MovieResponse> uploadMovie(@Valid @ModelAttribute UploadMovieRequest request) {
        return ApiResponse.<MovieResponse>builder()
                .result(movieService.uploadNewMovie(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<MovieResponse>> getAllMovies(
            @RequestParam(defaultValue = "") String query,
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "PAGE_NUMBER_INVALID") int page,
            @RequestParam(defaultValue = "10")
                    @Min(value = 1, message = "PAGE_SIZE_INVALID")
                    @Max(value = 20, message = "PAGE_SIZE_INVALID")
                    int size) {
        query = "%" + query + "%";
        return ApiResponse.<List<MovieResponse>>builder()
                .result(movieService.getAllMovies(query, page, size))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<MovieResponse> getMovie(@PathVariable String id) {
        return ApiResponse.<MovieResponse>builder()
                .result(movieService.getMovie(id))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<MovieResponse> updateMovie(@PathVariable String id, @Valid @ModelAttribute UploadMovieRequest request) {
        return ApiResponse.<MovieResponse>builder()
                .result(movieService.updateMovie(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteMovie(@PathVariable String id) {
        movieService.deleteMovie(id);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping("/s3/all")
    ApiResponse<List<String>> getMoviesInS3() {
        return ApiResponse.<List<String>>builder()
                .result(movieService.getAllObjectsInS3())
                .build();
    }
}
