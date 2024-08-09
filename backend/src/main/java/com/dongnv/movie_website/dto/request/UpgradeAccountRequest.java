package com.dongnv.movie_website.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpgradeAccountRequest {
    @Min(value = 1, message = "INVALID_VALIDITY_PERIOD")
    @NotNull(message = "NOT_NULL")
    int validityPeriod;
}
