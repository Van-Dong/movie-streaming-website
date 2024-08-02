package com.dongnv.movie_website.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error!", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(1001, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1002, "User not exist", HttpStatus.BAD_REQUEST),
    PASSWORD_INCORRECT(1003, "Old password not match", HttpStatus.BAD_REQUEST),
    INVALID_USERNAME(1004, "Username must be at least 4 characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1005, "Password must be at least 8 characters", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(1006, "Email should be valid", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1007, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1008, "You don't have permission", HttpStatus.FORBIDDEN),
    METHOD_NOT_ALLOWED(1009, "Request method is not supported", HttpStatus.METHOD_NOT_ALLOWED),
    ;

    ErrorCode(int code, String name, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = name;
        this.httpStatusCode = httpStatusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode httpStatusCode;
}
