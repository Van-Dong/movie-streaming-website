package com.dongnv.movie_website.dto.request.movie;

import java.util.List;

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
public class UploadMovieRequest {
    @NotNull
    String title;

    String nativeTitle;
    String description;
    String producingCountry;
    int yearOfRelease;
    int duration;

    boolean series;
    boolean full;
    boolean isPrivate;

    @FileConstraint(type = "video", message = "TYPE_OF_VIDEO_NOT_SUPPORTED")
    MultipartFile trailerFile;

    @FileConstraint(type = "image", message = "TYPE_OF_IMAGE_NOT_SUPPORTED")
    MultipartFile posterFile;

    @FileConstraint(type = "video", message = "TYPE_OF_VIDEO_NOT_SUPPORTED")
    MultipartFile movieFile;

    long studioId;
    List<Long> genreIds;
    List<Long> actorIds;
    List<Long> directorIds;
    List<Long> characterIds;
}
