package com.dongnv.movie_website.dto.request.user;

import jakarta.validation.constraints.NotNull;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateCommentRequest {

    @NotNull(message = "NOT_NULL")
    String comment;

    @NotNull(message = "NOT_NULL")
    String movieId;
}
