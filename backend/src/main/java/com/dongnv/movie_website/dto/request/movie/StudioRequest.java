package com.dongnv.movie_website.dto.request.movie;

import jakarta.validation.constraints.NotNull;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudioRequest {
    @NotNull(message = "NOT_NULL")
    String name;

    String description;
}
