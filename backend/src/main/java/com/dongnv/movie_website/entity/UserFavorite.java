package com.dongnv.movie_website.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

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
@Table(name = "user_favorite", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "movie_id"}))
public class UserFavorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    //    @Column(name = "movie_id")
    //    String movieId;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    Movie movie;

    @JsonIgnore
    @Column(name = "user_id")
    String userId;

    @CreationTimestamp
    LocalDateTime createdAt;
}
