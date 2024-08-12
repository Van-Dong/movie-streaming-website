package com.dongnv.movie_website.entity;

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
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column(
            name = "name",
            unique = true,
            nullable = false,
            columnDefinition = "VARCHAR(255) COLLATE utf8mb4_unicode_ci")
    String name;

    String portraitUrl;
}
