package com.dongnv.movie_website.controller;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.user.UserRatingRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.UserRatingResponse;
import com.dongnv.movie_website.dto.response.movie.MovieRatingResponse;
import com.dongnv.movie_website.service.RatingService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/ratings")
@Slf4j
public class RatingController {
    RatingService ratingService;

    @PostMapping
    ApiResponse<UserRatingResponse> userRatingMovie(@Valid @RequestBody UserRatingRequest request) {
        return ApiResponse.<UserRatingResponse>builder()
                .result(ratingService.ratingMovie(request))
                .build();
    }

    @GetMapping("/{movieId}")
    ApiResponse<UserRatingResponse> getUserMovieRating(@PathVariable String movieId) {
        return ApiResponse.<UserRatingResponse>builder()
                .result(ratingService.getMovieRating(movieId))
                .build();
    }

    @GetMapping("/public/{movieId}")
    ApiResponse<MovieRatingResponse> getPublicMovieRating(@PathVariable String movieId) {
        return ApiResponse.<MovieRatingResponse>builder()
                .result(ratingService.getPublicMovieRating(movieId))
                .build();
    }
}
