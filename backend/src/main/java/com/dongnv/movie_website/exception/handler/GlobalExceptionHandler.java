package com.dongnv.movie_website.exception.handler;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.mail.MailSendException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

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
        String enumKey = exception.getAllErrors().getFirst().getDefaultMessage();
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

    // MailException is parent
    @ExceptionHandler(value = MailSendException.class)
    ResponseEntity<ApiResponse<Void>> handlingMailSendException(MailSendException exception) {
        ErrorCode errorCode = ErrorCode.FAILED_SEND_EMAIL;
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ApiResponse.<Void>builder()
                        .status(false)
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = NoResourceFoundException.class)
    ResponseEntity<ApiResponse<Void>> handlingNoResourceFoundException(NoResourceFoundException exception) {
        ErrorCode errorCode = ErrorCode.NOT_FOUND_404;
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ApiResponse.<Void>builder()
                        .status(false)
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = HandlerMethodValidationException.class)
    ResponseEntity<ApiResponse<Void>> handlingHandlerMethodValidationException(
            HandlerMethodValidationException exception) {
        String enumKey = exception.getAllErrors().getFirst().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.valueOf(enumKey);
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ApiResponse.<Void>builder()
                        .status(false)
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    ResponseEntity<ApiResponse<Void>> handlingHttpMessageNotReadableException(
            HttpMessageNotReadableException exception) {
        ErrorCode errorCode = ErrorCode.MISSING_REQUEST_BODY;
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ApiResponse.<Void>builder()
                        .status(false)
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = DataIntegrityViolationException.class)
    ResponseEntity<ApiResponse<Void>> handlingDataIntegrityViolationException(
            DataIntegrityViolationException exception) {
        ErrorCode errorCode = ErrorCode.DATA_INTEGRITY_VIOLATION;
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ApiResponse.<Void>builder()
                        .status(false)
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = MethodArgumentTypeMismatchException.class)
    ResponseEntity<ApiResponse<Void>> handlingMethodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException exception) {
        ErrorCode errorCode = ErrorCode.ARGUMENT_TYPE_MISMATCH;
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(ApiResponse.<Void>builder()
                        .status(false)
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
}
