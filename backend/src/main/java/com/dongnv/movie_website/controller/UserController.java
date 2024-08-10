package com.dongnv.movie_website.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.user.UpgradeAccountRequest;
import com.dongnv.movie_website.dto.request.user.UserChangePasswordRequest;
import com.dongnv.movie_website.dto.request.user.UserCreationRequest;
import com.dongnv.movie_website.dto.request.user.UserUpdateRequest;
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
    ApiResponse<List<UserResponse>> getAll(
            @RequestParam(defaultValue = "") String query,
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "PAGE_NUMBER_INVALID") int page,
            @RequestParam(defaultValue = "10")
                    @Min(value = 0, message = "PAGE_SIZE_INVALID")
                    @Max(value = 20, message = "PAGE_SIZE_INVALID")
                    int size) {
        query = "%" + query + "%";
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getUsers(query, page, size))
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

    @PostMapping("/api/admin/users/vip/{userId}")
    ApiResponse<Void> upgradeAccount(@PathVariable String userId, @RequestBody @Valid UpgradeAccountRequest request) {
        userService.upgradeAccount(userId, request);
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
