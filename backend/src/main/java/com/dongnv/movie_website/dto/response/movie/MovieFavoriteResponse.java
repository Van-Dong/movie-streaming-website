package com.dongnv.movie_website.dto.response.movie;

import java.util.Set;

import com.dongnv.movie_website.entity.Genres;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieFavoriteResponse {
    String id;
    String title;
    String nativeTitle;
    String producingCountry;
    int yearOfRelease;
    int duration; // minutes
    String posterUrl;
    Set<Genres> genres;
}
