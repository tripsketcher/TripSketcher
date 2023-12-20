package com.tripsketcher.travel.user.controller;

import com.tripsketcher.travel.common.response.ApiResponseDto;
import com.tripsketcher.travel.common.response.MsgType;
import com.tripsketcher.travel.common.response.ResponseUtils;
import com.tripsketcher.travel.user.dto.request.EmailAuthenticationCodeRequestDto;
import com.tripsketcher.travel.user.dto.request.EmailAuthenticationRequestDto;
import com.tripsketcher.travel.user.dto.request.JoinRequestDto;
import com.tripsketcher.travel.user.dto.request.LoginRequestDto;
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

    @GetMapping("/email/{user-email}")
    public ApiResponseDto<Void> duplicateEmail(@PathVariable("user-email") String email){
        apiUsersService.duplicateEmail(email);
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

    @GetMapping("/info/{user-nickname}")
    public ApiResponseDto<PublicUserInfo> publicUserInfo(@PathVariable("user-nickname") String userNickname){
        return ResponseUtils.ok(apiUsersService.publicUserInfo(userNickname), MsgType.USER_INFO_SUCCESSFULLY);
    }

    @PostMapping("/login")
    public ApiResponseDto<Void> login(@Valid @RequestBody LoginRequestDto requestDto, HttpServletResponse response){
        apiUsersService.login(requestDto, response);
        return ResponseUtils.ok(MsgType.LOGIN_SUCCESSFULLY);
    }
}
