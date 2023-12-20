package com.tripsketcher.travel.user.repository;

import com.tripsketcher.travel.user.entity.Nickname;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NicknameRepository extends JpaRepository<Nickname, Long> { }
