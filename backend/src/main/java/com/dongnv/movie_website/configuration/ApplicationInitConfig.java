package com.dongnv.movie_website.configuration;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dongnv.movie_website.constant.RoleType;
import com.dongnv.movie_website.entity.Role;
import com.dongnv.movie_website.entity.User;
import com.dongnv.movie_website.repository.RoleRepository;
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
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            log.info("Application is started");
            // Create roles
            RoleType[] roleTypes = {RoleType.VIP_USER, RoleType.ADMIN};
            Role role = null;

            for (RoleType roleType : roleTypes) {
                if (!roleRepository.existsById(roleType.name())) {
                    role = Role.builder()
                            .name(roleType.name())
                            .description(roleType.getDescription())
                            .build();
                    roleRepository.save(role);
                }
            }

            // Create user
            if (!userRepository.existsByUsername(adminUsername)) {
                Set<Role> roles = new HashSet<>();

                role = roleRepository.findById(RoleType.ADMIN.name()).orElse(null);
                if (!Objects.isNull(role)) {
                    roles.add(role);
                } else {
                    log.warn("Can't add permission for ADMIN account, please check system!");
                }

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
