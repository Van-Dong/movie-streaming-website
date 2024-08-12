package com.dongnv.movie_website.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dongnv.movie_website.entity.Studio;

@Repository
public interface StudioRepository extends JpaRepository<Studio, Long> {
    List<Studio> findAllByNameLike(String name, Pageable pageable);
}
