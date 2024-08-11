package com.dongnv.movie_website.service;

import com.dongnv.movie_website.dto.request.CharacterRequest;
import com.dongnv.movie_website.dto.response.CharacterResponse;
import com.dongnv.movie_website.entity.Character;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.CharacterMapper;
import com.dongnv.movie_website.repository.CharacterRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CharacterService {
    CharacterRepository characterRepository;
    CharacterMapper characterMapper;
    AwsS3Service awsS3Service;

    public CharacterResponse createCharacter(CharacterRequest request) {
        Character character = characterMapper.toCharacter(request);
        if (Objects.nonNull(request.getPortraitFile())) {
            character.setPortraitUrl(awsS3Service.uploadFilePublic(request.getPortraitFile(), request.getName()));
        }
        character = characterRepository.save(character);
        return characterMapper.toCharacterResponse(character);
    }

    public List<CharacterResponse> getCharacters(String query, int page, int size) {
        List<Character> characters = characterRepository.findAllByNameLike(query, PageRequest.of(page, size, Sort.by("name")));
        return characters.stream().map(characterMapper::toCharacterResponse).toList();
    }

    public CharacterResponse updateCharacter(long id, CharacterRequest request) {
        Character character = characterRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.CHARACTER_NOT_FOUND)
        );
        characterMapper.updatedCharacter(character, request);
        if (Objects.nonNull(request.getPortraitFile())) {
            awsS3Service.deleteByUrl(character.getPortraitUrl());
            character.setPortraitUrl(awsS3Service.uploadFilePublic(request.getPortraitFile(), request.getName()));
        }
        character = characterRepository.save(character);
        return characterMapper.toCharacterResponse(character);
    }

    public void deleteCharacter(long id) {
        characterRepository.deleteById(id);
    }
}
