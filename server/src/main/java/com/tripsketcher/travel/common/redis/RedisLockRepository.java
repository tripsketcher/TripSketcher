package com.tripsketcher.travel.common.redis;

import com.tripsketcher.travel.common.exception.CustomException;
import com.tripsketcher.travel.common.exception.ErrorType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisLockRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final RedissonClient redissonClient;

    public Boolean lock(final String key) {
        return redisTemplate
                .opsForValue()
                .setIfAbsent(generateKey(key), "lock", Duration.ofMillis(3_000));
    }

    public Boolean unlock(final String key) {
        return redisTemplate.delete(generateKey(key));
    }

    private String generateKey(final String key) {
        return key;
    }

    public <T> void runOnLock(Object key, Supplier<T> task) {
        RLock lock = redissonClient.getLock("EnterLock" + key);
        try {
            // If a preceding lock is held by another thread, this will wait for 'waitTime' for the lock to be released. The lock will automatically release after 'leaseTime', allowing other threads to acquire the lock after a certain period.
            if (!lock.tryLock(10, 10, TimeUnit.SECONDS)) {
                log.info("Failed to acquire lock");
                throw new CustomException(ErrorType.FAILED_TO_ACQUIRE_LOCK);
            }
            log.info("Lock acquired successfully");
            task.get();
        } catch (InterruptedException e) {
            log.info("Executing catch block");
            Thread.currentThread().interrupt();
            throw new CustomException(ErrorType.INTERRUPTED_WHILE_WAITING_FOR_LOCK);
        } finally {
            log.info("Executing finally block");
            if (lock != null && lock.isLocked() && lock.isHeldByCurrentThread()) {
                lock.unlock();
                log.info("Unlock executed");
            }
        }
    }
}