package com.tripsketcher.travel.user.repository;

import com.tripsketcher.travel.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByIdAndDeletedDateIsNull(Long userId);
}
