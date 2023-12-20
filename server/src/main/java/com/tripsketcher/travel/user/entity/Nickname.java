package com.tripsketcher.travel.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Nickname {

    @Id @GeneratedValue
    private Long id;

    private String KoreanNickname;
    private String EnglishNickname;
}
