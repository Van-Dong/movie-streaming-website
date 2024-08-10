package com.dongnv.movie_website.dto.request.auth;

import jakarta.validation.constraints.NotNull;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VerifyResetPasswordTokenRequest {
    @NotNull(message = "INVALID_USERNAME")
    String username;

    @NotNull(message = "TOKEN_VERIFIED_NOT_VALID")
    String token;
}
