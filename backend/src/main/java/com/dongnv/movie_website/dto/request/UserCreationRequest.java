package com.dongnv.movie_website.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 4, message = "Username must be at least 4 characters")
    String username;
    String firstName;
    String lastName;

    @Email(message = "Email should be valid")
    String email;
    @Size(min = 8, message = "Password must be at least 8 characters")
    String password;
    String dob;
}
