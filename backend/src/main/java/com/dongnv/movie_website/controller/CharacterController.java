package com.dongnv.movie_website.controller;

import com.dongnv.movie_website.dto.request.CharacterRequest;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.dto.response.CharacterResponse;
import com.dongnv.movie_website.entity.Character;
import com.dongnv.movie_website.service.CharacterService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/characters")
@Slf4j
public class CharacterController {
    CharacterService characterService;

    @PostMapping
    ApiResponse<CharacterResponse> createCharacter(@Valid CharacterRequest request) {
        return ApiResponse.<CharacterResponse>builder()
                .result(characterService.createCharacter(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<CharacterResponse>> getCharacters(@RequestParam(defaultValue = "") String query,
                                                       @RequestParam(defaultValue = "0") @Min(value = 0, message = "PAGE_NUMBER_INVALID") int page,
                                                       @RequestParam(defaultValue = "10") @Min(value = 1, message = "PAGE_SIZE_INVALID")
                                                       @Max(value = 20, message = "PAGE_SIZE_INVALID") int size) {
        query = "%" + query + "%";
        return ApiResponse.<List<CharacterResponse>>builder()
                .result(characterService.getCharacters(query, page, size))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<CharacterResponse> updateCharacter(@PathVariable long id, @Valid CharacterRequest request) {
        return ApiResponse.<CharacterResponse>builder()
                .result(characterService.updateCharacter(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Valid> deleteCharacter(@PathVariable long id) {
        characterService.deleteCharacter(id);
        return ApiResponse.<Valid>builder().build();
    }
}
