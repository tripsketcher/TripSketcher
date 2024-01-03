package com.tripsketcher.travel.user.controller;

import com.tripsketcher.travel.common.response.ApiResponseDto;
import com.tripsketcher.travel.common.response.MsgType;
import com.tripsketcher.travel.common.response.ResponseUtils;
import com.tripsketcher.travel.user.dto.request.*;
import com.tripsketcher.travel.user.dto.response.PublicUserInfo;
import com.tripsketcher.travel.user.service.ApiUsersService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class ApiUsersController {

    private final ApiUsersService apiUsersService;

    @GetMapping("/email")
    public ApiResponseDto<Void> duplicateEmail(@Valid @RequestBody EmailAuthenticationRequestDto requestDto){
        apiUsersService.duplicateEmail(requestDto.getEmail());
        return ResponseUtils.ok(MsgType.NO_DUPLICATE_EMAIL);
    }

    @PostMapping("/email")
    public ApiResponseDto<Void> emailAuthentication(@Valid @RequestBody EmailAuthenticationRequestDto requestDto){
        apiUsersService.sendVerificationEmail(requestDto);
        return ResponseUtils.ok(MsgType.AUTHENTICATION_EMAIL_SENT);
    }

    @PostMapping("/email/code")
    public ApiResponseDto<Void> emailAuthenticationCode(@Valid @RequestBody EmailAuthenticationCodeRequestDto requestDto){
        apiUsersService.verificationEmail(requestDto);
        return ResponseUtils.ok(MsgType.AUTHENTICATION_EMAIL_SUCCESS);
    }

    @PostMapping("/join")
    public ApiResponseDto<Void> join(@Valid @RequestBody JoinRequestDto requestDto){
        apiUsersService.join(requestDto);
        return ResponseUtils.ok(MsgType.JOIN_SUCCESSFULLY);
    }

    @GetMapping("/info/{user_nickname}")
    public ApiResponseDto<PublicUserInfo> publicUserInfo(@PathVariable("user_nickname") String userNickname){
        return ResponseUtils.ok(apiUsersService.publicUserInfo(userNickname), MsgType.USER_INFO_SUCCESSFULLY);
    }

    @PostMapping("/login")
    public ApiResponseDto<Void> login(@Valid @RequestBody LoginRequestDto requestDto, HttpServletResponse response){
        apiUsersService.login(requestDto, response);
        return ResponseUtils.ok(MsgType.LOGIN_SUCCESSFULLY);
    }

    @PostMapping("/forgot-password")
    public ApiResponseDto<Void> sendResetCode(@Valid @RequestBody EmailAuthenticationRequestDto requestDto) {
        apiUsersService.sendResetCode(requestDto);
        return ResponseUtils.ok(MsgType.AUTHENTICATION_EMAIL_SENT);
    }
    @PatchMapping("/password-reset")
    public ApiResponseDto<Void> resetPassword(@Valid @RequestBody EmailAuthenticationCodeRequestDto requestDto){
        apiUsersService.resetPassword(requestDto);
        return ResponseUtils.ok(MsgType.RESET_PASSWORD_EMAIL_SENT);
    }
}
