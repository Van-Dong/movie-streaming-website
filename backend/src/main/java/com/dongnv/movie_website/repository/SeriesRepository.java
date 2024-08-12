package com.dongnv.movie_website.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dongnv.movie_website.entity.Series;

@Repository
public interface SeriesRepository extends JpaRepository<Series, Long> {
    List<Series> findAllByMovieId(String movieId);
}
