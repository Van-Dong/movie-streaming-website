package com.dongnv.movie_website.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.movie.StudioRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.StudioResponse;
import com.dongnv.movie_website.service.StudioService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/studios")
@Slf4j
public class StudioController {
    StudioService studioService;

    @PostMapping
    ApiResponse<StudioResponse> createStudio(@Valid @RequestBody StudioRequest request) {
        return ApiResponse.<StudioResponse>builder()
                .result(studioService.createStudio(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<StudioResponse>> getStudios(
            @RequestParam(defaultValue = "") String query,
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "PAGE_NUMBER_INVALID") int page,
            @RequestParam(defaultValue = "10")
                    @Min(value = 1, message = "PAGE_SIZE_INVALID")
                    @Max(value = 20, message = "PAGE_SIZE_INVALID")
                    int size) {
        query = "%" + query + "%";
        return ApiResponse.<List<StudioResponse>>builder()
                .result(studioService.getStudios(query, page, size))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<StudioResponse> updateStudio(@PathVariable long id, @Valid @RequestBody StudioRequest request) {
        return ApiResponse.<StudioResponse>builder()
                .result(studioService.updateStudio(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteStudio(@PathVariable long id) {
        studioService.deleteStudio(id);
        return ApiResponse.<Void>builder().build();
    }
}
