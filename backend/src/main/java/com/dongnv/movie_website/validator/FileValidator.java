package com.dongnv.movie_website.validator;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.springframework.web.multipart.MultipartFile;

public class FileValidator implements ConstraintValidator<FileConstraint, MultipartFile> {
    private String type;
    private static final List<String> ALLOWED_VIDEO_TYPE =
            Arrays.asList("video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/x-matroska");
    private static final List<String> ALLOWED_IMAGE_TYPE = Arrays.asList(
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/bmp",
            "image/webp",
            "image/tiff",
            "image/svg+xml",
            "image/x-icon");

    @Override
    public void initialize(FileConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
        type = constraintAnnotation.type();
    }

    @Override
    public boolean isValid(MultipartFile multipartFile, ConstraintValidatorContext constraintValidatorContext) {
        if (Objects.isNull(multipartFile)) return true;

        if (type.equals("video") && ALLOWED_VIDEO_TYPE.contains(multipartFile.getContentType())) return true;
        if (type.equals("image") && ALLOWED_IMAGE_TYPE.contains(multipartFile.getContentType())) return true;

        return false;
    }
}
