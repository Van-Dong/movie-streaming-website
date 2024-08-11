package com.dongnv.movie_website.dto.request;

import com.dongnv.movie_website.exception.ErrorCode;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DirectorRequest {
    @NotNull(message = "NOT_NULL")
    String name;
    MultipartFile portraitFile;
}
