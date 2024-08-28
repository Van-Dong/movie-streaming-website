package com.dongnv.movie_website.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.user.AddFavoriteRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.FavoriteResponse;
import com.dongnv.movie_website.service.UserFavoriteService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/favorites")
@Slf4j
public class UserFavoriteController {
    UserFavoriteService userFavoriteService;

    @PostMapping
    ApiResponse<FavoriteResponse> addToFavorite(@Valid @RequestBody AddFavoriteRequest request) {
        return ApiResponse.<FavoriteResponse>builder()
                .result(userFavoriteService.addToFavorite(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<FavoriteResponse>> getMyFavorite(
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "PAGE_NUMBER_INVALID") int page,
            @RequestParam(defaultValue = "10")
                    @Min(value = 1, message = "PAGE_SIZE_INVALID")
                    @Max(value = 20, message = "PAGE_SIZE_INVALID")
                    int size) {
        return ApiResponse.<List<FavoriteResponse>>builder()
                .result(userFavoriteService.getMyFavorite(page, size))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteFromFavorite(@PathVariable Long id) {
        userFavoriteService.removeFromFavorite(id);
        return ApiResponse.<Void>builder().build();
    }
}
