package com.dongnv.movie_website.exception.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.dongnv.movie_website.dto.response.ApiResponse;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse<Void>> handlingException(Exception exception) {
        log.info("Exception: ", exception);
        ErrorCode errorCode = ErrorCode.UNCATEGORIZED_EXCEPTION;
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ApiResponse.<Void>builder()
                        .code(errorCode.getCode())
                        .status(false)
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse<Void>> handlingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ApiResponse.<Void>builder()
                        .status(false)
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<Void>> handlingValidationException(MethodArgumentNotValidException exception) {
        String enumKey = exception.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.valueOf(enumKey);
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ApiResponse.<Void>builder()
                        .status(false)
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
    ResponseEntity<ApiResponse<Void>> handlingMethodNotSupportedException(
            HttpRequestMethodNotSupportedException exception) {
        ErrorCode errorCode = ErrorCode.METHOD_NOT_ALLOWED;
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ApiResponse.<Void>builder()
                        .status(false)
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
}
