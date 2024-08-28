package com.dongnv.movie_website.dto.request.movie;

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
public class UpdatedEpisodeRequest {
    Long id;

    @NotNull(message = "NOT_NULL")
    int episodeNumber;

    @FileConstraint(type = "video", message = "TYPE_OF_VIDEO_NOT_SUPPORTED")
    MultipartFile episodeMovieFile;
}
