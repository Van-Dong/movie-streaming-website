package com.dongnv.movie_website.mapper;

import com.dongnv.movie_website.dto.request.CharacterRequest;
import com.dongnv.movie_website.dto.response.CharacterResponse;
import com.dongnv.movie_website.entity.Character;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CharacterMapper {
    Character toCharacter(CharacterRequest request);
    CharacterResponse toCharacterResponse(Character character);
    void updatedCharacter(@MappingTarget Character character, CharacterRequest request);
}
