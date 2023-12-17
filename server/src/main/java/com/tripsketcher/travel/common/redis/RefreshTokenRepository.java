package com.tripsketcher.travel.common.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
public class RefreshTokenRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ValueOperations<String, Object> valueOperations;

    @Autowired
    public RefreshTokenRepository(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.valueOperations = redisTemplate.opsForValue();
    }

    public void saveRefreshToken(String userId, String refreshToken, long duration) {
        valueOperations.set(userId, refreshToken, duration, TimeUnit.SECONDS);
    }

    public String findRefreshTokenByUserId(String userId) {
        return (String) valueOperations.get(userId);
    }

    public void deleteRefreshToken(String userId) {
        redisTemplate.delete(userId);
    }
}
