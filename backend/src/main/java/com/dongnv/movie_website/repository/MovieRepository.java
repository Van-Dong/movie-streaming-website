package com.dongnv.movie_website.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dongnv.movie_website.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {
    List<Movie> findAllByTitleLike(String title, Pageable pageable);
}
