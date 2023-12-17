package com.tripsketcher.travel.common.jwt;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RefreshTokenService {

    private final RedisTemplate<String, Object> redisTemplate;

    public RefreshTokenService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveRefreshToken(String username, String refreshToken, long duration) {
        redisTemplate.opsForValue().set(username, refreshToken, duration, TimeUnit.MILLISECONDS);
    }

    public boolean validateRefreshToken(String username, String refreshToken) {
        String storedToken = (String) redisTemplate.opsForValue().get(username);
        return refreshToken.equals(storedToken);
    }
}