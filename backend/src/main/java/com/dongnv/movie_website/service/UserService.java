package com.dongnv.movie_website.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dongnv.movie_website.constant.RoleType;
import com.dongnv.movie_website.dto.request.user.UpgradeAccountRequest;
import com.dongnv.movie_website.dto.request.user.UserChangePasswordRequest;
import com.dongnv.movie_website.dto.request.user.UserCreationRequest;
import com.dongnv.movie_website.dto.request.user.UserUpdateRequest;
import com.dongnv.movie_website.dto.response.UserResponse;
import com.dongnv.movie_website.entity.User;
import com.dongnv.movie_website.entity.UserRole;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.UserMapper;
import com.dongnv.movie_website.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;

    public UserResponse createUser(UserCreationRequest request) {
        User user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return userMapper.toUserResponse(user);
    }

    public List<UserResponse> getUsers(String query, int page, int size) {
        List<User> users = userRepository.findAllByUsernameLike(query, PageRequest.of(page, size, Sort.by("username")));
        return users.stream().map(userMapper::toUserResponse).toList();
    }

    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userMapper.updateUser(user, request);

        user = userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    public void changePassword(UserChangePasswordRequest request) {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword()))
            throw new AppException(ErrorCode.PASSWORD_INCORRECT);

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    public void upgradeAccount(String id, UpgradeAccountRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Set<UserRole> roles = user.getRoles();
        Optional<UserRole> roleOptional = roles.stream()
                .filter(r -> r.getName().equals(RoleType.VIP_USER.name()))
                .findFirst();

        long timeRemaining = 0;
        if (roleOptional.isPresent()) {
            UserRole r = roleOptional.get();
            if (r.getExpiryDate().isAfter(LocalDate.now()))
                timeRemaining = ChronoUnit.DAYS.between(LocalDate.now(), r.getExpiryDate());
            roles.remove(r);
        }

        roles.add(UserRole.builder()
                .name(RoleType.VIP_USER.name())
                .assignedDate(LocalDate.now())
                .expiryDate(LocalDate.now().plusDays(request.getValidityPeriod() + timeRemaining))
                .build());

        userRepository.save(user);
    }
}
