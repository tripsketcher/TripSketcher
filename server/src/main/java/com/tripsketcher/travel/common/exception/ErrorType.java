package com.tripsketcher.travel.common.exception;

import lombok.Getter;

@Getter
public enum ErrorType {

    NOT_FOUND_USER(401, "등록된 사용자가 없습니다."),
    NOT_VALID_USER(401, "등록된 사용자가 유효하지 않습니다."),
    ALREADY_EXIST_USERID(401, "이미 존재하는 아이디입니다."),
    NOT_MATCHING_INFO(401, "회원 정보가 일치하지 않습니다."),
    NO_TOKEN(401, "토큰이 없습니다."),
    NOT_VALID_TOKEN(401, "토큰이 유효하지 않습니다."),
    NOT_VALID_ROLE(401, "유저 권한이 부족합니다."),
    TOKEN_EXPIRED(401, "토큰이 만료되었습니다."),
    FAILED_TO_ACQUIRE_LOCK(401, "락 획득에 실패했습니다."),
    INTERRUPTED_WHILE_WAITING_FOR_LOCK(401, "락을 기다리는 동안 인터럽트가 발생하였습니다"),
    ;
    private final int code;
    private final String msg;

    ErrorType(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}