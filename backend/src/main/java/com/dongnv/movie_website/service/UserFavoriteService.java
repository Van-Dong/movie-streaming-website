package com.dongnv.movie_website.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dongnv.movie_website.dto.request.user.AddFavoriteRequest;
import com.dongnv.movie_website.dto.response.AddFavoriteResponse;
import com.dongnv.movie_website.dto.response.FavoriteResponse;
import com.dongnv.movie_website.entity.Movie;
import com.dongnv.movie_website.entity.User;
import com.dongnv.movie_website.entity.UserFavorite;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.UserFavoriteMapper;
import com.dongnv.movie_website.repository.MovieRepository;
import com.dongnv.movie_website.repository.UserFavoriteRepository;
import com.dongnv.movie_website.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserFavoriteService {
    UserFavoriteRepository userFavoriteRepository;
    UserFavoriteMapper userFavoriteMapper;
    UserRepository userRepository;
    MovieRepository movieRepository;

    public AddFavoriteResponse addToFavorite(AddFavoriteRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Movie movie = movieRepository
                .findById(request.getMovieId())
                .orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));

        UserFavorite userFavorite =
                UserFavorite.builder().userId(user.getId()).movie(movie).build();
        userFavorite = userFavoriteRepository.save(userFavorite);

        return AddFavoriteResponse.builder()
                .id(userFavorite.getId())
                .movieId(movie.getId())
                .build();
    }

    public List<FavoriteResponse> getMyFavorite(int page, int size) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        List<UserFavorite> userFavoriteList = userFavoriteRepository.findAllByUserId(
                user.getId(), PageRequest.of(page, size, Sort.by("createdAt").descending()));

        return userFavoriteList.stream()
                .map(userFavoriteMapper::toFavoriteResponse)
                .toList();
    }

    public void removeFromFavorite(Long id) {
        userFavoriteRepository.deleteById(id);
    }

    public void removeAll() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userFavoriteRepository.deleteAllByUserId(user.getId());
    }
}
