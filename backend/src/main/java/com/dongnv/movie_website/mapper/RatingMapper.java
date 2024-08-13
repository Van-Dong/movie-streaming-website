package com.dongnv.movie_website.mapper;

import com.dongnv.movie_website.dto.request.user.UserRatingRequest;
import com.dongnv.movie_website.dto.response.UserRatingResponse;
import com.dongnv.movie_website.entity.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RatingMapper {
    Rating toRating(UserRatingRequest request);
    UserRatingResponse toRatingResponse(Rating rating);
    void updatedRating(@MappingTarget Rating rating, UserRatingRequest request);
}
