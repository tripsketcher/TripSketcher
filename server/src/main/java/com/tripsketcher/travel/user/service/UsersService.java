package com.tripsketcher.travel.user.service;

import com.tripsketcher.travel.user.dto.response.UserInfo;
import com.tripsketcher.travel.user.entity.Users;
import com.tripsketcher.travel.user.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository usersRepository;

    // service method

    public UserInfo info(Users user){
        return UserInfo.builder()
                .userEmail(user.getUserEmail())
                .userNickname(user.getUserNickname())
                .userProfileImage(user.getUserProfileImage())
                .build();
    }



    // internal method

}
