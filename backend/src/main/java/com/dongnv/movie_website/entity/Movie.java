package com.dongnv.movie_website.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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
    boolean isSeries;
    boolean status;

    int duration; // minutes
    String posterURL;
    String movieKey;
    String trailerKey;

    //    Studio studio;
    //    Set<Category> categories;
    //    Set<Actor> actors;
    //    Set<Director> directors;
}
