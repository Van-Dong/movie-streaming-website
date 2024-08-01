package com.dongnv.movie_website.dto.request;

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
    @Size(min = 8, message = "Password must be at least 8 characters")
    String newPassword;
}
