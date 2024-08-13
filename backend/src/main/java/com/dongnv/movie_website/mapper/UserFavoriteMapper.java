package com.dongnv.movie_website.mapper;

import com.dongnv.movie_website.dto.request.user.AddFavoriteRequest;
import com.dongnv.movie_website.dto.response.FavoriteResponse;
import com.dongnv.movie_website.entity.UserFavorite;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserFavoriteMapper {
    UserFavorite toUserFavorites(AddFavoriteRequest request);
    FavoriteResponse toFavoriteResponse(UserFavorite userFavorite);
}
