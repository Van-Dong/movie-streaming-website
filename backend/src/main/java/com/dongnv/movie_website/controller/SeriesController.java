package com.dongnv.movie_website.controller;

import java.util.List;

import com.dongnv.movie_website.dto.request.movie.UpdateSeriesRequest;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.movie.SeriesRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.SeriesResponse;
import com.dongnv.movie_website.service.SeriesService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/series")
@Slf4j
public class SeriesController {
    SeriesService seriesService;

    @PostMapping
    ApiResponse<SeriesResponse> createSeries(@Valid @ModelAttribute SeriesRequest request) {
        return ApiResponse.<SeriesResponse>builder()
                .result(seriesService.createSeries(request))
                .build();
    }

    @GetMapping("/{movieId}")
    ApiResponse<List<SeriesResponse>> getAllSeries(@PathVariable String movieId) {
        return ApiResponse.<List<SeriesResponse>>builder()
                .result(seriesService.getAllSeries(movieId))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<SeriesResponse> updateSeries(@PathVariable long id, @Valid @ModelAttribute UpdateSeriesRequest request) {
        return ApiResponse.<SeriesResponse>builder()
                .result(seriesService.updateSeries(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteSeries(@PathVariable long id) {
        seriesService.deleteSeries(id);
        return ApiResponse.<Void>builder().build();
    }
}
