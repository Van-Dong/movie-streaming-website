package com.dongnv.movie_website.service;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dongnv.movie_website.dto.request.ActorRequest;
import com.dongnv.movie_website.dto.response.ActorResponse;
import com.dongnv.movie_website.entity.Actor;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.ActorMapper;
import com.dongnv.movie_website.repository.ActorRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ActorService {
    ActorRepository actorRepository;
    ActorMapper actorMapper;
    AwsS3Service awsS3Service;

    public ActorResponse createActor(ActorRequest request) {
        Actor actor = actorMapper.toActor(request);

        if (Objects.nonNull(request.getPortraitFile()))
            actor.setPortraitUrl(awsS3Service.uploadFilePublic(request.getPortraitFile(), request.getName()));

        actor = actorRepository.save(actor);
        return actorMapper.toActorResponse(actor);
    }

    public List<ActorResponse> getActors(String query, int page, int size) {
        List<Actor> actors = actorRepository.findAllByNameLike(query, PageRequest.of(page, size, Sort.by("name")));
        return actors.stream().map(actor -> actorMapper.toActorResponse(actor)).toList();
    }

    public ActorResponse updateActor(long id, ActorRequest request) {
        Actor actor = actorRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ACTOR_NOT_FOUND));

        actorMapper.updatedActor(actor, request);
        if (Objects.nonNull(request.getPortraitFile())) {
            awsS3Service.deleteByUrl(actor.getPortraitUrl());
            actor.setPortraitUrl(awsS3Service.uploadFilePublic(request.getPortraitFile(), request.getName()));
        }
        actor = actorRepository.save(actor);
        return actorMapper.toActorResponse(actor);
    }

    public void deleteActor(long id) {
        actorRepository.deleteById(id);
    }
}
