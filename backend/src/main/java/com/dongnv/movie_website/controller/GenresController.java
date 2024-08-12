package com.dongnv.movie_website.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.movie.GenreRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.GenreResponse;
import com.dongnv.movie_website.service.GenresService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class GenresController {
    GenresService genresService;

    @GetMapping
    ApiResponse<List<GenreResponse>> getCategories(
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "PAGE_NUMBER_INVALID") int page,
            @RequestParam(defaultValue = "10")
                    @Min(value = 1, message = "PAGE_SIZE_INVALID")
                    @Max(value = 20, message = "PAGE_SIZE_INVALID")
                    int size,
            @RequestParam(defaultValue = "") String query) {
        query = "%" + query + "%";
        return ApiResponse.<List<GenreResponse>>builder()
                .result(genresService.getGenres(query, page, size))
                .build();
    }

    @PostMapping
    ApiResponse<GenreResponse> createCategory(@RequestBody @Valid GenreRequest request) {
        return ApiResponse.<GenreResponse>builder()
                .result(genresService.createGenre(request))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<GenreResponse> updateCategory(@PathVariable long id, @RequestBody @Valid GenreRequest request) {
        return ApiResponse.<GenreResponse>builder()
                .result(genresService.updateGenre(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteCategory(@PathVariable long id) {
        genresService.deleteGenre(id);
        return ApiResponse.<Void>builder().build();
    }
}
