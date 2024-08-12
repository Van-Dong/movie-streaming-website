package com.dongnv.movie_website.mapper;

import com.dongnv.movie_website.dto.request.movie.UpdatedEpisodeRequest;
import com.dongnv.movie_website.entity.Episode;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface EpisodeMapper {

    void updatedEpisode(@MappingTarget Episode episode, UpdatedEpisodeRequest request);
}
