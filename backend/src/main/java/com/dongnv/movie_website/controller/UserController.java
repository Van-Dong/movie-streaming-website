package com.dongnv.movie_website.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.UserChangePasswordRequest;
import com.dongnv.movie_website.dto.request.UserCreationRequest;
import com.dongnv.movie_website.dto.request.UserUpdateRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.UserResponse;
import com.dongnv.movie_website.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
// @RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @GetMapping("/api/admin/users")
    ApiResponse<List<UserResponse>> getAll() {
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getAll())
                .build();
    }

    @PutMapping("/api/admin/users/{userId}")
    ApiResponse<UserResponse> updateUser(@RequestBody @Valid UserUpdateRequest request, @PathVariable String userId) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUser(userId, request))
                .build();
    }

    @DeleteMapping("/api/admin/users/{userId}")
    ApiResponse<Void> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ApiResponse.<Void>builder().build();
    }

    // sign up - create user
    @PostMapping("/api/user/sign-up")
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping("/api/user/profile")
    ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @PutMapping("/api/user/newPassword")
    ApiResponse<Void> changePassword(@RequestBody @Valid UserChangePasswordRequest request) {
        userService.changePassword(request);
        return ApiResponse.<Void>builder().build();
    }
}
