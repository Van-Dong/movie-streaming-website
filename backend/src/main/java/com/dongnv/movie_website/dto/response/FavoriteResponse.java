package com.dongnv.movie_website.dto.response;

import com.dongnv.movie_website.dto.response.movie.MovieFavoriteResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FavoriteResponse {
    Long id;
    //    String movieId;
    MovieFavoriteResponse movie;
}
