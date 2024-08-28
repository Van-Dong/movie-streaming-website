package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.dongnv.movie_website.dto.request.movie.UpdatedEpisodeRequest;
import com.dongnv.movie_website.entity.Episode;

@Mapper(componentModel = "spring")
public interface EpisodeMapper {

    void updatedEpisode(@MappingTarget Episode episode, UpdatedEpisodeRequest request);
}
