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
public class ActorRequest {
    @NotNull(message = "NOT_NULL")
    String name;

    MultipartFile portraitFile;
}
