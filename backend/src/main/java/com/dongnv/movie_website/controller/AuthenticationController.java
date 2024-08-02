package com.dongnv.movie_website.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dongnv.movie_website.dto.request.AuthenticationRequest;
import com.dongnv.movie_website.dto.request.LogoutRequest;
import com.dongnv.movie_website.dto.request.RefreshRequest;
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
}
