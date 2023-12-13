package com.tripsketcher.travel.common.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class JwtTokenProvider {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final String tokenType = "Bearer";
    private final String prefix = "Bearer ";
    private String secretKey;

    public static long accessTokenValidTime = 60 * 60 * 1000L; // 1 hour
    public static long refreshTokenValidTime = 7 * 60 * 60 * 24 * 1000L; // 1 week


}
