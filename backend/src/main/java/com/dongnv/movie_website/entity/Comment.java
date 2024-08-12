package com.dongnv.movie_website.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

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
