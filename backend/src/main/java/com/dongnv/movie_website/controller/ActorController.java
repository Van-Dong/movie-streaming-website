package com.dongnv.movie_website.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import org.springframework.web.bind.annotation.*;

import com.dongnv.movie_website.dto.request.ActorRequest;
import com.dongnv.movie_website.dto.response.ActorResponse;
import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.service.ActorService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/actors")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ActorController {
    ActorService actorService;

    @PostMapping
    ApiResponse<ActorResponse> createActor(@Valid ActorRequest request) {
        return ApiResponse.<ActorResponse>builder()
                .result(actorService.createActor(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<ActorResponse>> getActors(
            @RequestParam(defaultValue = "") String query,
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "PAGE_NUMBER_INVALID") int page,
            @RequestParam(defaultValue = "10")
                    @Min(value = 1, message = "PAGE_SIZE_INVALID")
                    @Max(value = 20, message = "PAGE_SIZE_INVALID")
                    int size) {
        query = "%" + query + "%";
        return ApiResponse.<List<ActorResponse>>builder()
                .result(actorService.getActors(query, page, size))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<ActorResponse> updateActor(@PathVariable long id, @Valid ActorRequest request) {
        return ApiResponse.<ActorResponse>builder()
                .result(actorService.updateActor(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteActor(@PathVariable long id) {
        actorService.deleteActor(id);
        return ApiResponse.<Void>builder().build();
    }
}
