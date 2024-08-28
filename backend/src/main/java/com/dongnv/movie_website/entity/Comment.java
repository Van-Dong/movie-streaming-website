package com.dongnv.movie_website.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    //    String userId;
    @ManyToOne(fetch = FetchType.LAZY)
    User user;

    String movieId;
    String comment;

    @CreationTimestamp
    LocalDateTime createdAt;
}
