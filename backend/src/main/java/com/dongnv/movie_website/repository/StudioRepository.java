package com.dongnv.movie_website.repository;

import com.dongnv.movie_website.entity.Studio;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudioRepository extends JpaRepository<Studio, Long> {
    List<Studio> findAllByNameLike(String name, Pageable pageable);
}
