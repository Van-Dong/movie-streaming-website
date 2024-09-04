package com.dongnv.movie_website.entity;

import java.util.Set;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String title;
    String nativeTitle;
    String description;
    String producingCountry;
    Integer yearOfRelease;
    Boolean full;

    @Builder.Default
    Boolean isPrivate = false;

    Integer duration; // minutes
    String posterUrl;
    String trailerUrl;
    String movieKey;

    @Builder.Default
    Boolean series = false;

    @ManyToOne
    @JoinColumn(name = "studio_id")
    Studio studio;

    @ManyToMany
    Set<Genres> genres;

    @ManyToMany
    Set<Actor> actors;

    @ManyToMany
    Set<Director> directors;

    @ManyToMany
    Set<Character> characters;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "movieId")
    Set<Series> seriesSet;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "movieId")
    Set<Comment> comments;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "movie_id")
    Set<Rating> ratings;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "movie_id")
    Set<UserFavorite> userFavorites;
}
