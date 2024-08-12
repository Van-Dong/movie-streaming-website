package com.dongnv.movie_website.dto.request.movie;

import java.util.List;

import jakarta.validation.constraints.NotNull;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeriesRequest {
    String movieId;

    @NotNull(message = "NOT_NULL")
    int season;

    int totalEpisodes;
    List<EpisodeRequest> episodes;
}
