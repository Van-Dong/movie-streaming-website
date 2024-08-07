package com.dongnv.movie_website.mapper;

import com.dongnv.movie_website.dto.request.CategoryRequest;
import com.dongnv.movie_website.dto.response.CategoryResponse;
import com.dongnv.movie_website.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryRequest request);
    CategoryResponse toCategoryResponse(Category category);
    void updateCategory(@MappingTarget Category category, CategoryRequest request);
}
