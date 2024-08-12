package com.dongnv.movie_website.dto.response;

import java.util.Set;

import com.dongnv.movie_website.entity.Episode;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeriesResponse {
    long id;
    String movieId;
    int season;
    int totalEpisodes;
    Set<Episode> episodes;
}
