package com.dongnv.movie_website.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Series {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String movieId;
    int season;
    int totalEpisodes;

    @OneToMany
    @JoinColumn(name = "seriesId")
    Set<Episode> episodes;
}
