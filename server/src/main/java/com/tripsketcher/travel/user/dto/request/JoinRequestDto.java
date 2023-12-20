package com.tripsketcher.travel.user.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class JoinRequestDto {

    @NotNull(message = "필수 정보입니다.")
    @Size(max = 50, message = "tooLongEmail")
    @Pattern(regexp = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", message = "notEmailFormat")
    private String email;

    @NotNull(message = "필수 정보입니다.")
    @Size(min = 8, max = 64, message = "비밀번호 사이즈가 맞지 않습니다.")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\/-]{8,64}$", message = "notPasswordFormat")
    private String password;
}
