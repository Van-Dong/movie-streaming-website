package com.dongnv.movie_website.service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Objects;
import java.util.StringJoiner;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.dongnv.movie_website.dto.request.AuthenticationRequest;
import com.dongnv.movie_website.dto.request.LogoutRequest;
import com.dongnv.movie_website.dto.request.RefreshRequest;
import com.dongnv.movie_website.dto.response.AuthenticationResponse;
import com.dongnv.movie_website.dto.response.RefreshResponse;
import com.dongnv.movie_website.entity.InvalidatedRefreshToken;
import com.dongnv.movie_website.entity.User;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.repository.InvalidatedRefreshTokenRepository;
import com.dongnv.movie_website.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationService {
    UserRepository userRepository;
    InvalidatedRefreshTokenRepository invalidatedRefreshTokenRepository;

    @NonFinal
    @Value("${jwt.signerKey}") // Spring không thể gán biến final qua @Value mà cần khởi tạo tại chỗ hoặc trong
    // constructor --> cần NonFinal
    String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.accessTokenExpiration}")
    long ACCESS_TOKEN_EXPIRATION;

    @NonFinal
    @Value("${jwt.refreshTokenExpiration}")
    long REFRESH_TOKEN_EXPIRATION;

    @NonFinal
    @Value("${jwt.issuer}")
    String ISSUER;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String refreshToken = generateRefreshToken(user.getUsername());
        String accessToken = generateAccessToken(user);

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .build();
    }

    public RefreshResponse refreshToken(RefreshRequest request) {
        SignedJWT signedJWT = verifyToken(request.getToken());
        try {
            String jti = signedJWT.getJWTClaimsSet().getJWTID();
            if (invalidatedRefreshTokenRepository.existsById(jti)) throw new AppException(ErrorCode.UNAUTHENTICATED);

            User user = userRepository
                    .findByUsername(signedJWT.getJWTClaimsSet().getSubject())
                    .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
            String accessToken = generateAccessToken(user);
            return RefreshResponse.builder()
                    .token(accessToken)
                    .tokenType("Bearer")
                    .build();
        } catch (ParseException e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    public void logout(LogoutRequest request) {
        try {
            SignedJWT signedJWT = verifyToken(request.getToken());
            JWTClaimsSet jwtClaimsSet = signedJWT.getJWTClaimsSet();

            if (Objects.isNull(jwtClaimsSet.getClaim("type"))) throw new AppException(ErrorCode.UNAUTHENTICATED);

            String jti = jwtClaimsSet.getJWTID();
            Date expiryTime = jwtClaimsSet.getExpirationTime();

            InvalidatedRefreshToken invalidatedToken = InvalidatedRefreshToken.builder()
                    .id(jti)
                    .expiryTime(expiryTime)
                    .build();

            invalidatedRefreshTokenRepository.save(invalidatedToken);
        } catch (AppException | ParseException ignored) {

        }
    }

    public SignedJWT verifyToken(String token) {
        JWSVerifier verifier;
        SignedJWT signedJWT;
        boolean isValid;
        Date expiryTime;
        try {
            verifier = new MACVerifier(SIGNER_KEY.getBytes());
            signedJWT = SignedJWT.parse(token);
            isValid = signedJWT.verify(verifier);
            expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        } catch (JOSEException | ParseException e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        if (!(isValid && expiryTime.after(new Date()))) throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    private String generateRefreshToken(String username) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(username)
                .issuer(ISSUER)
                .issueTime(new Date())
                .jwtID(UUID.randomUUID().toString())
                .expirationTime(new Date(Instant.now()
                        .plus(REFRESH_TOKEN_EXPIRATION, ChronoUnit.MINUTES)
                        .toEpochMilli()))
                .claim("type", "Refresh")
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) { // lỗi trong quá trình ký và mã háo
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }

    private String generateAccessToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer(ISSUER)
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now()
                        .plus(ACCESS_TOKEN_EXPIRATION, ChronoUnit.MINUTES)
                        .toEpochMilli()))
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }

    private String buildScope(User user) {
        StringJoiner joiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(user.getRoles())) {
            user.getRoles().forEach(role -> joiner.add(role.getName()));
        }

        return joiner.toString();
    }
}
