package com.dongnv.movie_website.exception;

import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;


@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error!", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(1001, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1002, "User not exist", HttpStatus.BAD_REQUEST),
    PASSWORD_INCORRECT(1003, "Old password not match", HttpStatus.BAD_REQUEST),
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
