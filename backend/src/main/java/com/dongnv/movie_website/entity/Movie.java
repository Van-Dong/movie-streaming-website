package com.dongnv.movie_website.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

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
    int yearOfRelease;
    boolean full;

    @Builder.Default
    boolean isPrivate = false;

    int duration; // minutes
    String posterUrl;
    String trailerUrl;
    String movieKey;

    @Builder.Default
    boolean series = false;

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
}
