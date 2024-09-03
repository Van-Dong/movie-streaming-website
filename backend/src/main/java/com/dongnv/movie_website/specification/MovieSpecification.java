package com.dongnv.movie_website.specification;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

import org.springframework.data.jpa.domain.Specification;

import com.dongnv.movie_website.entity.Genres;
import com.dongnv.movie_website.entity.Movie;
import com.dongnv.movie_website.entity.Studio;

public class MovieSpecification {
    public static Specification<Movie> hasTitle(String title) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Movie> hasProducingCountry(String producingCountry) {
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(
                criteriaBuilder.lower(root.get("producingCountry")), producingCountry.toLowerCase()));
    }

    public static Specification<Movie> hasYearOfRelease(Integer yearOfRelease) {
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.between(root.get("yearOfRelease"), yearOfRelease, yearOfRelease + 5));
    }

    public static Specification<Movie> hasStudio(Long studioId) {
        return (root, query, criteriaBuilder) -> {
            Join<Movie, Studio> studioJoin = root.join("studio", JoinType.INNER);
            return criteriaBuilder.equal(studioJoin.get("id"), studioId);
        };
    }

    public static Specification<Movie> hasGenres(Long genreId) {
        return (root, query, criteriaBuilder) -> {
            Join<Movie, Genres> genresJoin = root.join("genres", JoinType.INNER);
            return criteriaBuilder.equal(genresJoin.get("id"), genreId);
        };
    }
}
