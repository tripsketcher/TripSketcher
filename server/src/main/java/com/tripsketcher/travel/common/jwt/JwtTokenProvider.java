package com.tripsketcher.travel.common.jwt;

import com.tripsketcher.travel.common.exception.CustomException;
import com.tripsketcher.travel.common.exception.ErrorType;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
@Slf4j
public class JwtTokenProvider {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final String tokenType = "Bearer";
    private final String prefix = "Bearer ";
    private String secretKey;

    public static long accessTokenValidTime = 60 * 60 * 1000L; // 1 hour
    public static long refreshTokenValidTime = 7 * 60 * 60 * 24 * 1000L; // 1 week

    public String createAccessToken(Authentication authentication) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenValidTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createRefreshToken() {
        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshTokenValidTime);

        return Jwts.builder()
                .setId(UUID.randomUUID().toString()) // JTI for refresh token
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public JwtCode validateToken(String jwtToken) {
        if (jwtToken == null) {
            return JwtCode.DENIED;
        }

        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return JwtCode.ACCESS;
        } catch (ExpiredJwtException e) {
            return JwtCode.EXPIRED;
        } catch (JwtException | IllegalArgumentException e) {
            log.info("잘못된 JWT 서명입니다.");
        }
        return JwtCode.DENIED;
    }

    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }
}
