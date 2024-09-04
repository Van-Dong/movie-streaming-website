package com.dongnv.movie_website.dto.response.movie;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieRatingResponse {
    Double avg;
    Long count;
}
