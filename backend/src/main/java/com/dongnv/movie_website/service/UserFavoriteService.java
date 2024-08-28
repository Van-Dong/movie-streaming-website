package com.dongnv.movie_website.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dongnv.movie_website.dto.request.user.AddFavoriteRequest;
import com.dongnv.movie_website.dto.response.FavoriteResponse;
import com.dongnv.movie_website.entity.User;
import com.dongnv.movie_website.entity.UserFavorite;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.UserFavoriteMapper;
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

    public FavoriteResponse addToFavorite(AddFavoriteRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        UserFavorite userFavorite = userFavoriteMapper.toUserFavorites(request);
        userFavorite.setUserId(user.getId());
        userFavorite = userFavoriteRepository.save(userFavorite);

        return userFavoriteMapper.toFavoriteResponse(userFavorite);
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
}
