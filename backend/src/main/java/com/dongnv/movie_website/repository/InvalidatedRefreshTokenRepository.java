package com.dongnv.movie_website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dongnv.movie_website.entity.InvalidatedRefreshToken;

@Repository
public interface InvalidatedRefreshTokenRepository extends JpaRepository<InvalidatedRefreshToken, String> {}
