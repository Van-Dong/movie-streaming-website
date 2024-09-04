package com.dongnv.movie_website.dto.response.movie;

import com.dongnv.movie_website.entity.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WatchMovieResponse {
    String id;
    String title;
    String nativeTitle;
    String description;
    String producingCountry;
    int yearOfRelease;
    boolean series;
    boolean full;
    int duration; // minutes

    String posterUrl;
    String trailerUrl;
    String movieUrl;
}
