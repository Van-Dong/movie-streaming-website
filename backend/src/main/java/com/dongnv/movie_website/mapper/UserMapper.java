package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.dongnv.movie_website.dto.request.user.UserCreationRequest;
import com.dongnv.movie_website.dto.request.user.UserUpdateRequest;
import com.dongnv.movie_website.dto.response.UserResponse;
import com.dongnv.movie_website.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
