package com.tripsketcher.travel.common.response;

import lombok.Getter;

@Getter
public enum MsgType {

    // users
    JOIN_SUCCESSFULLY("회원가입 성공"),
    LOGIN_SUCCESSFULLY("로그인 성공"),
    NO_DUPLICATE_EMAIL("이메일 중복이 없습니다"),
    AUTHENTICATION_EMAIL_SENT("인증 이메일을 발송하였습니다"),
    AUTHENTICATION_EMAIL_SUCCESS("이메일 인증을 완료하였습니다."),
    USER_INFO_SUCCESSFULLY("유저정보 조회 성공"),
    RESET_PASSWORD_EMAIL_SENT("비밀번호 변경 메일을 발송하였습니다."),

    ;

    private final String msg;

    MsgType(String msg) {
        this.msg = msg;
    }
}
