package com.dongnv.movie_website.constant;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum RoleType {
    ADMIN("Administrator - who operator system"),
    VIP_USER("Vip user - have advance permission");

    String description;

    RoleType(String description) {
        this.description = description;
    }
}
