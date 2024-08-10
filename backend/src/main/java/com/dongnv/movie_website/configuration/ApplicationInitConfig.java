package com.dongnv.movie_website.configuration;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dongnv.movie_website.constant.RoleType;
import com.dongnv.movie_website.entity.User;
import com.dongnv.movie_website.entity.UserRole;
import com.dongnv.movie_website.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @NonFinal
    String adminUsername = "admin";

    @NonFinal
    String adminPassword = "admin";

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {

        return args -> {
            log.info("Application is started");
            // Create user
            if (!userRepository.existsByUsername(adminUsername)) {
                Set<UserRole> roles = new HashSet<>();
                UserRole role = UserRole.builder().name(RoleType.ADMIN.name()).build();
                roles.add(role);

                User user = User.builder()
                        .username(adminUsername)
                        .password(passwordEncoder.encode(adminPassword))
                        .roles(roles)
                        .build();

                userRepository.save(user);
                log.info("Create admin account success, please change default password!");
            }
        };
    }
}
