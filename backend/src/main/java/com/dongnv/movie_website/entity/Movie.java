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
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String title;
    String nativeTitle;
    String description;
    String producingCountry;
    int yearOfRelease;
    boolean isSeries;
    boolean status;

    int duration; // minutes
    String posterURL;
    String movieKey;
    String trailerKey;

    @OneToMany
    @JoinColumn(name = "movieId")
    Set<Series> series;

    //    Studio studio;
    //    Set<Category> categories;
    //    Set<Genres> genres;
    //    Set<Director> directors;
//    Set<Character> characters;


}
