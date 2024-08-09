package com.dongnv.movie_website.dto.request;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

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
    MultipartFile file;
}
