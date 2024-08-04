package com.dongnv.movie_website.controller;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.*;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.AuthenticationResponse;
import com.dongnv.movie_website.dto.response.RefreshResponse;
import com.dongnv.movie_website.service.AuthenticationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/token")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ApiResponse.<AuthenticationResponse>builder()
                .result(authenticationService.authenticate(request))
                .build();
    }

    @PostMapping("/refresh")
    ApiResponse<RefreshResponse> refreshToken(@RequestBody RefreshRequest request) {
        return ApiResponse.<RefreshResponse>builder()
                .result(authenticationService.refreshToken(request))
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/verifyEmail")
    ApiResponse<Void> verifyEmail() {
        authenticationService.sendVerificationEmail();
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/verifyEmail/verifyToken")
    ApiResponse<Void> verifyVerificationEmailToken(@RequestBody @Valid VerifyTokenRequest request) {
        authenticationService.verifyEmailToken(request);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/resetPassword/verifyToken")
    ApiResponse<Void> verifyResetPasswordToken(@RequestBody @Valid VerifyResetPasswordTokenRequest request) {
        log.info("ResetPassword VerifyToken");
        authenticationService.verifyResetPasswordToken(request);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/resetPassword")
    ApiResponse<Void> createResetPasswordRequest(@RequestBody @Valid ResetPasswordRequest request) {
        authenticationService.createResetPasswordRequest(request);
        return ApiResponse.<Void>builder().build();
    }
}
