package com.dongnv.movie_website.repository;

import com.dongnv.movie_website.entity.Character;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    List<Character> findAllByNameLike(String name, Pageable pageable);
}
