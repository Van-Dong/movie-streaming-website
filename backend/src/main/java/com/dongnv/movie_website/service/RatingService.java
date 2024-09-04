package com.dongnv.movie_website.service;

import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dongnv.movie_website.dto.request.user.UserRatingRequest;
import com.dongnv.movie_website.dto.response.UserRatingResponse;
import com.dongnv.movie_website.dto.response.movie.MovieRatingResponse;
import com.dongnv.movie_website.entity.Rating;
import com.dongnv.movie_website.entity.User;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.RatingMapper;
import com.dongnv.movie_website.repository.MovieRepository;
import com.dongnv.movie_website.repository.RatingRepository;
import com.dongnv.movie_website.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RatingService {
    RatingMapper ratingMapper;
    RatingRepository ratingRepository;
    UserRepository userRepository;
    MovieRepository movieRepository;

    public UserRatingResponse ratingMovie(UserRatingRequest request) {
        String movieId = request.getMovieId();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Optional<Rating> ratingOptional = ratingRepository.findByUserIdAndMovieId(user.getId(), movieId);

        Rating rating;
        if (ratingOptional.isPresent()) {
            rating = ratingOptional.get();
            rating.setUserRating(request.getUserRating());
        } else {
            rating = ratingMapper.toRating(request);
            rating.setUserId(user.getId());
        }
        rating = ratingRepository.save(rating);

        return UserRatingResponse.builder()
                .movieId(movieId)
                .userRating(rating.getUserRating())
                .count(ratingRepository.countRatingByMovieId(movieId))
                .avg(ratingRepository.findAverageRatingByMovieId(movieId))
                .build();
    }

    public UserRatingResponse getMovieRating(String movieId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Rating rating =
                ratingRepository.findByUserIdAndMovieId(user.getId(), movieId).orElse(new Rating());

        return UserRatingResponse.builder()
                .avg(ratingRepository.findAverageRatingByMovieId(movieId))
                .count(ratingRepository.countRatingByMovieId(movieId))
                .movieId(movieId)
                .userRating(rating.getUserRating())
                .build();
    }

    public MovieRatingResponse getPublicMovieRating(String movieId) {
        return MovieRatingResponse.builder()
                .avg(ratingRepository.findAverageRatingByMovieId(movieId))
                .count(ratingRepository.countRatingByMovieId(movieId))
                .build();
    }
}
