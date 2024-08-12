package com.dongnv.movie_website.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DirectorResponse {
    long id;
    String name;
    String portraitUrl;
}
