package com.dongnv.movie_website.controller;

import com.dongnv.movie_website.dto.request.CategoryRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.CategoryResponse;
import com.dongnv.movie_website.service.CategoryService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CategoryController {
    CategoryService categoryService;

    @GetMapping
    ApiResponse<List<CategoryResponse>> getCategories(@RequestParam(defaultValue = "0") @Min(value = 0, message = "PAGE_NUMBER_INVALID") int page,
                                                      @RequestParam(defaultValue = "10") @Min(value = 1, message = "PAGE_SIZE_INVALID")
                                                      @Max(value = 20, message = "PAGE_SIZE_INVALID") int size,
                                                      @RequestParam(defaultValue = "") String query) {
        query = "%" + query + "%";
        return ApiResponse.<List<CategoryResponse>>builder()
                .result(categoryService.getCategories(query, page, size))
                .build();
    }

    @PostMapping
    ApiResponse<CategoryResponse> createCategory(@RequestBody @Valid CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.createCategory(request))
                .build();
    }

    @PutMapping("/{name}")
    ApiResponse<CategoryResponse> updateCategory(@PathVariable String name, @RequestBody @Valid CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.updateCategory(name, request))
                .build();
    }

    @DeleteMapping("/{name}")
    ApiResponse<Void> deleteCategory(@PathVariable String name) {
        categoryService.deleteCategory(name);
        return ApiResponse.<Void>builder().build();
    }
}
