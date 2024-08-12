package com.dongnv.movie_website.validator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {FileValidator.class})
public @interface FileConstraint {
    String message() default "Invalid type of file";

    String type();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
