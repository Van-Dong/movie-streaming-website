package com.dongnv.movie_website.service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dongnv.movie_website.dto.request.movie.UploadMovieRequest;
import com.dongnv.movie_website.dto.response.MovieResponse;
import com.dongnv.movie_website.entity.*;
import com.dongnv.movie_website.entity.Character;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.MovieMapper;
import com.dongnv.movie_website.repository.*;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class MovieService {
    AwsS3Service awsS3Service;
    MovieRepository movieRepository;
    MovieMapper movieMapper;
    StudioRepository studioRepository;
    GenresRepository genresRepository;
    ActorRepository actorRepository;
    CharacterRepository characterRepository;
    DirectorRepository directorRepository;

    public MovieResponse uploadNewMovie(UploadMovieRequest request) {
        Movie movie = movieMapper.toMovie(request);
        Studio studio = studioRepository
                .findById(request.getStudioId())
                .orElseThrow(() -> new AppException(ErrorCode.STUDIO_NOT_FOUND));
        movie.setStudio(studio);

        List<Genres> genres = genresRepository.findAllById(request.getGenreIds());
        List<Actor> actors = actorRepository.findAllById(request.getActorIds());
        List<Character> characters = characterRepository.findAllById(request.getCharacterIds());
        List<Director> directors = directorRepository.findAllById(request.getDirectorIds());
        movie.setGenres(new HashSet<>(genres));
        movie.setActors(new HashSet<>(actors));
        movie.setCharacters(new HashSet<>(characters));
        movie.setDirectors(new HashSet<>(directors));

        if (Objects.nonNull(request.getMovieFile())) {
            movie.setMovieKey(awsS3Service.uploadVideo(request.getMovieFile(), request.getTitle()));
        }

        if (Objects.nonNull(request.getTrailerFile())) {
            movie.setTrailerUrl(
                    awsS3Service.uploadFilePublic(request.getTrailerFile(), request.getTitle() + " trailer"));
        }

        if (Objects.nonNull(request.getPosterFile())) {
            movie.setPosterUrl(awsS3Service.uploadFilePublic(request.getPosterFile(), request.getTitle() + "poster"));
        }
        movie = movieRepository.save(movie);

        return movieMapper.toMovieResponse(movie);
    }

    public List<MovieResponse> getAllMovies(String query, int page, int size) {
        List<Movie> movie = movieRepository.findAllByTitleLike(query, PageRequest.of(page, size, Sort.by("title")));
        return movie.stream().map(movieMapper::toMovieResponse).toList();
    }

    public MovieResponse getMovie(String id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));
        return movieMapper.toMovieResponse(movie);
    }

    public MovieResponse updateMovie(String id, UploadMovieRequest request) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));

        movieMapper.updatedMovie(movie, request);
        Studio studio = studioRepository
                .findById(request.getStudioId())
                .orElseThrow(() -> new AppException(ErrorCode.STUDIO_NOT_FOUND));
        movie.setStudio(studio);

        List<Genres> genres = genresRepository.findAllById(request.getGenreIds());
        List<Actor> actors = actorRepository.findAllById(request.getActorIds());
        List<Character> characters = characterRepository.findAllById(request.getCharacterIds());
        List<Director> directors = directorRepository.findAllById(request.getDirectorIds());
        movie.setGenres(new HashSet<>(genres));
        movie.setActors(new HashSet<>(actors));
        movie.setCharacters(new HashSet<>(characters));
        movie.setDirectors(new HashSet<>(directors));

        if (Objects.nonNull(request.getMovieFile())) {
            movie.setMovieKey(awsS3Service.uploadVideo(request.getMovieFile(), request.getTitle()));
        }

        if (Objects.nonNull(request.getTrailerFile())) {
            movie.setTrailerUrl(
                    awsS3Service.uploadFilePublic(request.getTrailerFile(), request.getTitle() + " trailer"));
        }

        if (Objects.nonNull(request.getPosterFile())) {
            movie.setPosterUrl(awsS3Service.uploadFilePublic(request.getPosterFile(), request.getTitle() + "poster"));
        }

        movie = movieRepository.save(movie);
        return movieMapper.toMovieResponse(movie);
    }

    public void deleteMovie(String id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));
        awsS3Service.deleteFile(movie.getMovieKey());
        awsS3Service.deleteByUrl(movie.getPosterUrl());
        awsS3Service.deleteByUrl(movie.getTrailerUrl());
        movieRepository.deleteById(id);
    }

    public List<String> getAllObjectsInS3() {
        return awsS3Service.getObjectsInBucket();
    }
}
