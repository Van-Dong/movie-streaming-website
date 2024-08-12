package com.dongnv.movie_website.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dongnv.movie_website.entity.Character;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    List<Character> findAllByNameLike(String name, Pageable pageable);
}
