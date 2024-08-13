package com.dongnv.movie_website.repository;

import com.dongnv.movie_website.entity.Rating;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByUserIdAndMovieId(String userId, String movieId);

    boolean existsByUserIdAndMovieId(String userId, String movieId);

    @Query("SELECT COUNT(*) FROM Rating r WHERE r.movieId = :movieId")
    long countRatingByMovieId(@Param("movieId") String movieId);

    @Query("SELECT AVG(r.userRating) FROM Rating r WHERE r.movieId = :movieId")
    Double findAverageRatingByMovieId(@Param("movieId") String movieId);
}
