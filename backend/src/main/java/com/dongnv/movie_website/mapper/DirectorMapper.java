package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.dongnv.movie_website.dto.request.person.DirectorRequest;
import com.dongnv.movie_website.dto.response.DirectorResponse;
import com.dongnv.movie_website.entity.Director;

@Mapper(componentModel = "spring")
public interface DirectorMapper {
    Director toDirector(DirectorRequest request);

    DirectorResponse toDirectorResponse(Director director);

    void updatedDirector(@MappingTarget Director director, DirectorRequest request);
}
