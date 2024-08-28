package com.dongnv.movie_website.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dongnv.movie_website.dto.request.movie.SeriesRequest;
import com.dongnv.movie_website.dto.request.movie.UpdateSeriesRequest;
import com.dongnv.movie_website.dto.response.SeriesResponse;
import com.dongnv.movie_website.entity.Episode;
import com.dongnv.movie_website.entity.Movie;
import com.dongnv.movie_website.entity.Series;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.EpisodeMapper;
import com.dongnv.movie_website.mapper.SeriesMapper;
import com.dongnv.movie_website.repository.EpisodeRepository;
import com.dongnv.movie_website.repository.MovieRepository;
import com.dongnv.movie_website.repository.SeriesRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SeriesService {
    SeriesRepository seriesRepository;
    SeriesMapper seriesMapper;
    MovieRepository movieRepository;
    AwsS3Service awsS3Service;
    EpisodeRepository episodeRepository;
    EpisodeMapper episodeMapper;

    public SeriesResponse createSeries(SeriesRequest request) {
        Movie movie = movieRepository
                .findById(request.getMovieId())
                .orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));
        Series series = seriesMapper.toSeries(request);
        Set<Episode> episodes = new HashSet<>();
        if (Objects.nonNull(request.getEpisodes())) {
            request.getEpisodes().forEach(episode -> {
                episodes.add(Episode.builder()
                        .episodeNumber(episode.getEpisodeNumber())
                        .episodeKey(
                                Objects.nonNull(episode.getEpisodeMovieFile())
                                        ? awsS3Service.uploadVideo(
                                                episode.getEpisodeMovieFile(),
                                                movie.getTitle() + "-" + "tap" + "-" + episode.getEpisodeNumber())
                                        : null)
                        .build());
            });
            series.setEpisodes(episodes);
        }
        series.setEpisodes(episodes);
        seriesRepository.save(series);

        return seriesMapper.toSeriesResponse(series);
    }

    public List<SeriesResponse> getAllSeries(String movieId) {
        List<Series> seriesList = seriesRepository.findAllByMovieId(movieId);
        return seriesList.stream().map(seriesMapper::toSeriesResponse).toList();
    }

    public SeriesResponse updateSeries(long id, UpdateSeriesRequest request) {
        Series series = seriesRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SERIES_NOT_FOUND));
        Movie movie = movieRepository
                .findById(request.getMovieId())
                .orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));

        seriesMapper.updatedSeries(series, request);

        Set<Episode> episodes = series.getEpisodes();
        Map<Long, Episode> episodeMap = episodes.stream().collect(Collectors.toMap(Episode::getId, e -> e));
        Set<Episode> newEpisodes = new HashSet<>();

        if (Objects.nonNull(request.getEpisodes())) {
            request.getEpisodes().forEach(episode -> {
                if (Objects.nonNull(episode.getId())) {
                    if (!episodeMap.containsKey(episode.getId()))
                        throw new AppException(ErrorCode.EPISODE_NOT_FOUND_WITH_ID);

                    Episode e = episodeMap.get(episode.getId());
                    episodeMapper.updatedEpisode(e, episode);

                    if (Objects.nonNull(episode.getEpisodeMovieFile()))
                        e.setEpisodeKey(awsS3Service.uploadVideo(
                                episode.getEpisodeMovieFile(),
                                movie.getTitle() + "-" + "tap" + "-" + episode.getEpisodeNumber()));
                    newEpisodes.add(e);
                } else {
                    Episode e = Episode.builder()
                            .episodeNumber(episode.getEpisodeNumber())
                            .episodeKey(
                                    Objects.nonNull(episode.getEpisodeMovieFile())
                                            ? awsS3Service.uploadVideo(
                                                    episode.getEpisodeMovieFile(),
                                                    movie.getTitle() + "-" + "tap" + "-" + episode.getEpisodeNumber())
                                            : null)
                            .build();
                    newEpisodes.add(e);
                }
            });
        }

        episodes.clear();
        episodes.addAll(newEpisodes);
        seriesRepository.save(series);
        return seriesMapper.toSeriesResponse(series);
    }

    public void deleteSeries(long id) {
        seriesRepository.deleteById(id);
    }
}
