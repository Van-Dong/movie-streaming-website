package com.dongnv.movie_website.mapper;

import com.dongnv.movie_website.dto.request.StudioRequest;
import com.dongnv.movie_website.dto.response.StudioResponse;
import com.dongnv.movie_website.entity.Studio;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StudioMapper {
    Studio toStudio(StudioRequest request);
    StudioResponse toStudioResponse(Studio studio);
    void updatedStudio(@MappingTarget Studio studio, StudioRequest request);
}
