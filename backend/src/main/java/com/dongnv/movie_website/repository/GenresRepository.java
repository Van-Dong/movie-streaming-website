package com.dongnv.movie_website.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dongnv.movie_website.entity.Genres;

@Repository
public interface GenresRepository extends JpaRepository<Genres, String> {
    List<Genres> findAllByNameLike(String name, Pageable pageable);

    List<Genres> findAllByNameLikeOrDescriptionLike(String name, String description, Pageable page);
}
