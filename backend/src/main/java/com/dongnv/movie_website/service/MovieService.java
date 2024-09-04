package com.dongnv.movie_website.service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.dongnv.movie_website.dto.request.movie.UploadMovieRequest;
import com.dongnv.movie_website.dto.response.movie.MovieResponse;
import com.dongnv.movie_website.dto.response.movie.WatchMovieResponse;
import com.dongnv.movie_website.entity.*;
import com.dongnv.movie_website.entity.Character;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.MovieMapper;
import com.dongnv.movie_website.repository.*;
import com.dongnv.movie_website.specification.MovieSpecification;

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

        log.info("Request: " + request.toString());
        log.info("Mapper: " + movie.toString());

        if (request.getStudioId() != null) {
            Studio studio = studioRepository
                    .findById(request.getStudioId())
                    .orElseThrow(() -> new AppException(ErrorCode.STUDIO_NOT_FOUND));
            movie.setStudio(studio);
        }

        if (request.getGenreIds() != null) {
            List<Genres> genres = genresRepository.findAllById(request.getGenreIds());
            movie.setGenres(new HashSet<>(genres));
        }

        if (request.getActorIds() != null) {
            List<Actor> actors = actorRepository.findAllById(request.getActorIds());
            movie.setActors(new HashSet<>(actors));
        }

        if (request.getCharacterIds() != null) {
            List<Character> characters = characterRepository.findAllById(request.getCharacterIds());
            movie.setCharacters(new HashSet<>(characters));
        }

        if (request.getDirectorIds() != null) {
            List<Director> directors = directorRepository.findAllById(request.getDirectorIds());
            movie.setDirectors(new HashSet<>(directors));
        }

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

    //    public List<MovieResponse> getAllMovies(String query, int page, int size) {
    //        Pageable paging = PageRequest.of(page, size, Sort.by("yearOfRelease"));
    //        Page<Movie> moviePage = movieRepository.findAllByTitleLike(query, paging);
    //        List<Movie> movies = moviePage.getContent();
    //        log.info("Total page: " + moviePage.getTotalPages() + "\nTotal element: " + moviePage.getTotalElements());
    ////        List<Movie> movie = movieRepository.findAllByTitleLike(query, PageRequest.of(page, size,
    // Sort.by("title")));
    //
    //        return movies.stream().map(movieMapper::toMovieResponse).toList();
    //    }

    public List<MovieResponse> searchMovies(
            String title,
            String producingCountry,
            Integer yearOfRelease,
            Long studioId,
            Long genreId,
            int page,
            int size) {
        Specification<Movie> specification = Specification.where(null);
        if (title != null && !title.isEmpty()) {
            specification = specification.and(MovieSpecification.hasTitle(title));
        }

        if (producingCountry != null && !producingCountry.isEmpty()) {
            specification = specification.and(MovieSpecification.hasProducingCountry(producingCountry));
        }

        if (yearOfRelease > 0) {
            specification = specification.and(MovieSpecification.hasYearOfRelease(yearOfRelease));
        }

        if (studioId != null && studioId > 0) {
            specification = specification.and(MovieSpecification.hasStudio(studioId));
        }

        if (genreId != null && genreId > 0) {
            specification = specification.and(MovieSpecification.hasGenres(genreId));
        }

        Page<Movie> moviePage = movieRepository.findAll(
                specification,
                PageRequest.of(page, size, Sort.by("yearOfRelease").descending()));
        List<Movie> movies = moviePage.getContent();

        return movies.stream().map(movieMapper::toMovieResponse).toList();
    }

    public MovieResponse getMovie(String id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));
        return movieMapper.toMovieResponse(movie);
    }

    public WatchMovieResponse getWatchMovie(String id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));
        WatchMovieResponse response = movieMapper.toWatchMovieResponse(movie);
        if (movie.getMovieKey() != null) {
            String tempUrl = awsS3Service.getPreSignedUrl(movie.getMovieKey(), 180);
            response.setMovieUrl(tempUrl);
        }
        return response;
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
