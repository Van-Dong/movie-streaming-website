package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;

import com.dongnv.movie_website.dto.response.FavoriteResponse;
import com.dongnv.movie_website.entity.UserFavorite;

@Mapper(componentModel = "spring")
public interface UserFavoriteMapper {
    FavoriteResponse toFavoriteResponse(UserFavorite userFavorite);
}
