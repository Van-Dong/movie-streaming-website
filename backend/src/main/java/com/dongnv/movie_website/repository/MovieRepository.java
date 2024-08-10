package com.dongnv.movie_website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dongnv.movie_website.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {}
