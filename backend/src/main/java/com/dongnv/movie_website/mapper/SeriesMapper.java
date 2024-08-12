package com.dongnv.movie_website.mapper;

import com.dongnv.movie_website.dto.request.movie.UpdateSeriesRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.dongnv.movie_website.dto.request.movie.SeriesRequest;
import com.dongnv.movie_website.dto.response.SeriesResponse;
import com.dongnv.movie_website.entity.Series;

@Mapper(componentModel = "spring")
public interface SeriesMapper {

    @Mapping(target = "episodes", ignore = true)
    Series toSeries(SeriesRequest request);

    SeriesResponse toSeriesResponse(Series series);

    @Mapping(target = "episodes", ignore = true)
    void updatedSeries(@MappingTarget Series series, UpdateSeriesRequest request);
}
