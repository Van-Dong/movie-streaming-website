package com.dongnv.movie_website.dto.request.user;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRatingRequest {
    @NotNull(message = "NOT_NULL")
    String movieId;

    @NotNull(message = "NOT_NULL")
    @Min(value = 1, message = "INVALID_RATING_NUMBER")
    @Max(value = 10, message = "INVALID_RATING_NUMBER")
    Integer userRating;
}
