package com.dongnv.movie_website.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.person.DirectorRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.DirectorResponse;
import com.dongnv.movie_website.service.DirectorService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/directors")
@Slf4j
public class DirectorController {
    DirectorService directorService;

    @PostMapping
    ApiResponse<DirectorResponse> createDirector(@Valid DirectorRequest request) {
        return ApiResponse.<DirectorResponse>builder()
                .result(directorService.createDirector(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<DirectorResponse>> getDirectors(
            @RequestParam(defaultValue = "") String query,
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "PAGE_NUMBER_INVALID") int page,
            @RequestParam(defaultValue = "10")
                    @Min(value = 1, message = "PAGE_SIZE_INVALID")
                    @Max(value = 20, message = "PAGE_SIZE_INVALID")
                    int size) {
        query = "%" + query + "%";
        return ApiResponse.<List<DirectorResponse>>builder()
                .result(directorService.getDirectors(query, page, size))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<DirectorResponse> updateDirector(@PathVariable long id, @Valid DirectorRequest request) {
        return ApiResponse.<DirectorResponse>builder()
                .result(directorService.updateDirector(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteDirector(@PathVariable long id) {
        directorService.deleteDirector(id);
        return ApiResponse.<Void>builder().build();
    }
}
