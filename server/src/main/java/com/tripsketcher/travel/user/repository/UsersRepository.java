package com.tripsketcher.travel.user.repository;

import com.tripsketcher.travel.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByIdAndDeletedDateIsNull(Long userId);
    Optional<Users> findByUserEmailAndDeletedDateIsNull(String email);
    Optional<Users> findByUserNickname(String nickname);
    Optional<Users> findByUserNicknameAndDeletedDateIsNull(String nickname);
}
