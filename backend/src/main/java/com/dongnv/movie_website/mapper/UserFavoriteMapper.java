package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;

import com.dongnv.movie_website.dto.request.user.AddFavoriteRequest;
import com.dongnv.movie_website.dto.response.FavoriteResponse;
import com.dongnv.movie_website.entity.UserFavorite;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserFavoriteMapper {
    UserFavorite toUserFavorites(AddFavoriteRequest request);

    FavoriteResponse toFavoriteResponse(UserFavorite userFavorite);
}
