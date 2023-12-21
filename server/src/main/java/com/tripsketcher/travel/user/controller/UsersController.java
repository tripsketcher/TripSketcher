package com.tripsketcher.travel.user.controller;

import com.tripsketcher.travel.common.response.ApiResponseDto;
import com.tripsketcher.travel.common.response.MsgType;
import com.tripsketcher.travel.common.response.ResponseUtils;
import com.tripsketcher.travel.user.dto.response.UserInfo;
import com.tripsketcher.travel.user.entity.Users;
import com.tripsketcher.travel.user.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UsersController {

    private final UsersService usersService;

    @GetMapping("/info")
    public ApiResponseDto<UserInfo> info(@AuthenticationPrincipal Users user){
        return ResponseUtils.ok(usersService.info(user), MsgType.USER_INFO_SUCCESSFULLY);
    }
}
