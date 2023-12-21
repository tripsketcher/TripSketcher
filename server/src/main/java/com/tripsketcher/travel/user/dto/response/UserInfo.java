package com.tripsketcher.travel.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@Builder
public class UserInfo {

    private String userEmail;
    private String userNickname;
    private String userProfileImage;

}
