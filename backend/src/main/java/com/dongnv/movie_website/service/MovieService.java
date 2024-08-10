package com.dongnv.movie_website.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.dongnv.movie_website.dto.request.UploadMovieRequest;
import com.dongnv.movie_website.dto.response.MovieResponse;
import com.dongnv.movie_website.entity.Movie;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.MovieMapper;
import com.dongnv.movie_website.repository.MovieRepository;

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

    public MovieResponse uploadNewMovie(UploadMovieRequest request) {
        Movie movie = movieMapper.toMovie(request);
        String movieKey;
        String trailerKey;
        if (!Objects.isNull(request.getFile())) {
            movieKey = awsS3Service.uploadVideo(request.getFile(), request.getTitle());
            movie.setMovieKey(movieKey);
        }

        if (!Objects.isNull(request.getTrailer())) {
            trailerKey = awsS3Service.uploadFilePublic(request.getTrailer(), request.getTitle() + " trailer");
            movie.setTrailerKey(trailerKey);
        }
        movieRepository.save(movie);

        return movieMapper.toMovieResponse(movie);
    }

    //    public MovieResponse updateMovie(String id, UploadMovieRequest request) {
    //
    //    }

    public MovieResponse getMovie(String id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));

        String urlTemp = awsS3Service.getPreSignedUrl(movie.getMovieKey(), 10);
        MovieResponse movieResponse = movieMapper.toMovieResponse(movie);
        movieResponse.setUrlTemp(urlTemp);

        return movieResponse;
    }

    public List<MovieResponse> getAllMovies() {
        List<Movie> movie = movieRepository.findAll();
        return movie.stream().map(movieMapper::toMovieResponse).toList();
    }

    public void deleteMovie(String id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));

        String key = movie.getMovieKey();
        awsS3Service.deleteFile(key);
        movieRepository.deleteById(id);
    }

    public List<String> getAllObjectsInS3() {
        return awsS3Service.getObjectsInBucket();
    }
}
