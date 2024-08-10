package com.dongnv.movie_website.dto.request.user;

import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserChangePasswordRequest {
    String oldPassword;

    @Size(min = 8, message = "INVALID_PASSWORD")
    String newPassword;
}
