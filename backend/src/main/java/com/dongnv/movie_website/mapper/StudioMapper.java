package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.dongnv.movie_website.dto.request.movie.StudioRequest;
import com.dongnv.movie_website.dto.response.StudioResponse;
import com.dongnv.movie_website.entity.Studio;

@Mapper(componentModel = "spring")
public interface StudioMapper {
    Studio toStudio(StudioRequest request);

    StudioResponse toStudioResponse(Studio studio);

    void updatedStudio(@MappingTarget Studio studio, StudioRequest request);
}
