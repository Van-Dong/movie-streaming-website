package com.dongnv.movie_website.repository;

import com.dongnv.movie_website.entity.Director;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {
    List<Director> findAllByNameLike(String name, Pageable pageable);
}
