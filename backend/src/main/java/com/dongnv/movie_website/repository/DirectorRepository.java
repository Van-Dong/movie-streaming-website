package com.dongnv.movie_website.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dongnv.movie_website.entity.Director;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {
    List<Director> findAllByNameLike(String name, Pageable pageable);
}
