package com.dongnv.movie_website.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

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
    String description;
    String producingCountry;
    int yearOfRelease;
    boolean isSeries = false;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    String urlTemp;
}
