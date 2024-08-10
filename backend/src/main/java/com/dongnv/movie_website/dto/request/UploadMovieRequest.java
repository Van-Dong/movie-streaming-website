package com.dongnv.movie_website.dto.request;

import jakarta.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UploadMovieRequest {
    @NotNull
    String title;

    String description;
    String producingCountry;
    int yearOfRelease;

    @Builder.Default
    boolean isSeries = false;

    @NotNull
    MultipartFile trailer;

    @NotNull
    MultipartFile file;
}
