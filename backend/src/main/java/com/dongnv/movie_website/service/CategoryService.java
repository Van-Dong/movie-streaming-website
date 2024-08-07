package com.dongnv.movie_website.service;

import com.dongnv.movie_website.dto.request.CategoryRequest;
import com.dongnv.movie_website.dto.response.CategoryResponse;
import com.dongnv.movie_website.entity.Category;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.CategoryMapper;
import com.dongnv.movie_website.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsById(request.getName()))
            throw new AppException(ErrorCode.CATEGORY_EXISTED);
        Category c = categoryMapper.toCategory(request);
        categoryRepository.save(c);
        return categoryMapper.toCategoryResponse(c);
    }

    public List<CategoryResponse> getCategories(String query, int page, int size) {
        List<Category> categories = categoryRepository.findAllByNameLike(query, PageRequest.of(page, size, Sort.by("name")));
        return categories.stream().map(categoryMapper::toCategoryResponse).toList();
    }

    public CategoryResponse updateCategory(String name, CategoryRequest request) {
        Category c = categoryRepository.findById(name).orElseThrow(
                () -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED)
        );

        categoryMapper.updateCategory(c, request);
        categoryRepository.save(c);
        return categoryMapper.toCategoryResponse(c);
    }

    public void deleteCategory(String name) {
        categoryRepository.deleteById(name);
    }
}
