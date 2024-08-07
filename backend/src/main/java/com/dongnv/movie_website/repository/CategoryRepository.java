package com.dongnv.movie_website.repository;

import com.dongnv.movie_website.entity.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    List<Category> findAllByNameLike(String name, Pageable pageable);
    List<Category> findAllByNameLikeOrDescriptionLike(String name, String description, Pageable page);
}
