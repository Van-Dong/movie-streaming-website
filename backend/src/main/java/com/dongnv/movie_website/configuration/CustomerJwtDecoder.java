package com.dongnv.movie_website.configuration;

import java.text.ParseException;
import java.util.Objects;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Component;

import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.service.AuthenticationService;
import com.nimbusds.jwt.SignedJWT;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class CustomerJwtDecoder implements JwtDecoder {

    private final AuthenticationService authenticationService;

    public CustomerJwtDecoder(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;

    private NimbusJwtDecoder nimbusJwtDecoder = null;

    @Override
    public Jwt decode(String token) throws JwtException {
        // Customer decoder (Case invalid token)
        try {
            SignedJWT signedJWT = authenticationService.verifyToken(token);
            if (!Objects.isNull(signedJWT.getJWTClaimsSet().getClaim("type")))
                throw new BadJwtException("Token invalid");
        } catch (ParseException | AppException e) {
            throw new BadJwtException(e.getMessage());
        }

        // Nimbus JWT Decoder
        if (Objects.isNull(nimbusJwtDecoder)) {
            SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");
            nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS512)
                    .build();
        }

        return nimbusJwtDecoder.decode(token);
    }
}
