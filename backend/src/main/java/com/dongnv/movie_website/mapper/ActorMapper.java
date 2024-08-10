package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.dongnv.movie_website.dto.request.ActorRequest;
import com.dongnv.movie_website.dto.response.ActorResponse;
import com.dongnv.movie_website.entity.Actor;

@Mapper(componentModel = "spring")
public interface ActorMapper {
    Actor toActor(ActorRequest request);

    ActorResponse toActorResponse(Actor actor);

    void updatedActor(@MappingTarget Actor actor, ActorRequest request);
}
