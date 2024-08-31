package com.dongnv.movie_website.dto.response;

import com.dongnv.movie_website.entity.Genres;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

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
