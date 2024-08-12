package com.dongnv.movie_website.dto.request.person;

import jakarta.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import com.dongnv.movie_website.validator.FileConstraint;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CharacterRequest {
    @NotNull(message = "NOT_NULL")
    String name;

    @FileConstraint(type = "image", message = "TYPE_OF_IMAGE_NOT_SUPPORTED")
    MultipartFile portraitFile;
}
