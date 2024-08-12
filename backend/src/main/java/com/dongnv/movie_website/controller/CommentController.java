package com.dongnv.movie_website.controller;

import com.dongnv.movie_website.dto.request.user.CreateCommentRequest;
import com.dongnv.movie_website.dto.request.user.UpdateCommentRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.CommentResponse;
import com.dongnv.movie_website.service.CommentService;
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
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/comments")
@Slf4j
public class CommentController {
    CommentService commentService;

    @PostMapping
    ApiResponse<CommentResponse> createComment(@Valid @RequestBody CreateCommentRequest request) {
        return ApiResponse.<CommentResponse>builder()
                .result(commentService.createComment(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<CommentResponse>> getComment(
            @RequestParam(defaultValue = "") String movieId,
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "PAGE_NUMBER_INVALID") int page,
            @RequestParam(defaultValue = "10")
            @Min(value = 1, message = "PAGE_SIZE_INVALID")
            @Max(value = 20, message = "PAGE_SIZE_INVALID")
            int size) {
        return ApiResponse.<List<CommentResponse>>builder()
                .result(commentService.getComment(movieId, page, size))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<CommentResponse> updateComment(@PathVariable Long id, @Valid @RequestBody UpdateCommentRequest request) {
        return ApiResponse.<CommentResponse>builder()
                .result(commentService.updateComment(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ApiResponse.<Void>builder().build();
    }

}
