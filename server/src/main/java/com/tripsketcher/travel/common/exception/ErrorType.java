package com.tripsketcher.travel.common.exception;

import lombok.Getter;

@Getter
public enum ErrorType {

    NOT_FOUND_USER(401, "등록된 사용자가 없습니다."),
    NOT_VALID_USER(401, "등록된 사용자가 유효하지 않습니다."),
    NOT_FOUND_MISSION(401, "등록된 도전과제가 없습니다."),
    NOT_CREATE_MISSION(401, "해당 도전과제를 만들 수 없습니다."),
    NOT_FOUND_FEEDBACK(401, "등록된 피드백이 없습니다."),
    NOT_FOUND_AUTO_TRANSFER(401, "등록된 자동이체가 없습니다"),
    NOT_FOUND_FAMILY(401, "등록된 가족이 없습니다"),
    NOT_MATCHING_FAMILY(401, "가족 정보가 일치하지 않습니다."),
    PICTURE_IS_NULL(400, "이미지가 첨부되지 않았습니다."),
    ALREADY_EXIST_USERID(401, "이미 존재하는 아이디입니다."),
    NOT_MATCHING_INFO(401, "회원 정보가 일치하지 않습니다."),
    NOT_TOKEN(401, "토큰이 없습니다."),
    NOT_VALID_TOKEN(401, "토큰이 유효하지 않습니다."),
    NOT_FOUND_DIARY(401, "등록된 가계부가 없습니다."),
    TODAY_IS_NOT_SUNDAY(401, "오늘은 일요일이 아닙니다."),
    NOT_MATCHING_ROLE(401, "역할이 맞지 않습니다"),
    FAILED_TO_ACQUIRE_LOCK(401, "락 획득에 실패했습니다."),
    NOT_FOUND_MONTHLY_GOAL_MONEY(401, "등록된 월별 목표 금액이 없습니다."),
    INTERRUPTED_WHILE_WAITING_FOR_LOCK(401, "락을 기다리는 동안 인터럽트가 발생하였습니다"),
    ALREADY_EXISTED_DIARY_SCORE(401, "이미 해당 날짜에 일일 점수가 존재 합니다."),
    ;
    private int code;
    private String msg;

    ErrorType(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
