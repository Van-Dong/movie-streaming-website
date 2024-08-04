package com.dongnv.movie_website.dto.response;

import java.util.Set;

import com.dongnv.movie_website.entity.Role;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;
    String firstName;
    String lastName;
    String email;
    String dob;
    boolean emailIsVerified;
    Set<Role> roles;
}
