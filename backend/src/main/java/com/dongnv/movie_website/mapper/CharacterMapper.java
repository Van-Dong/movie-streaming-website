package com.dongnv.movie_website.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.dongnv.movie_website.dto.request.person.CharacterRequest;
import com.dongnv.movie_website.dto.response.CharacterResponse;
import com.dongnv.movie_website.entity.Character;

@Mapper(componentModel = "spring")
public interface CharacterMapper {
    Character toCharacter(CharacterRequest request);

    CharacterResponse toCharacterResponse(Character character);

    void updatedCharacter(@MappingTarget Character character, CharacterRequest request);
}
