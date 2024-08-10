package com.dongnv.movie_website.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResetPasswordRequest {

    @NotNull(message = "INVALID_USERNAME")
    String username;

    @Email(message = "INVALID_EMAIL")
    @NotNull(message = "INVALID_EMAIL")
    String email;
}
