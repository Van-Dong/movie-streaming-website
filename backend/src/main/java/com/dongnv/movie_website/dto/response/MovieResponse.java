package com.dongnv.movie_website.dto.response;

import java.util.Set;

import com.dongnv.movie_website.entity.*;
import com.dongnv.movie_website.entity.Character;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieResponse {

    String id;
    String title;
    String nativeTitle;
    String description;
    String producingCountry;
    int yearOfRelease;
    boolean series;
    boolean full;
    boolean isPrivate;
    int duration; // minutes

    String posterUrl;
    String trailerUrl;
    String movieKey;

    Studio studio;
    Set<Genres> genres;
    Set<Director> directors;
    Set<Character> characters;
    Set<Series> seriesSet;
}
