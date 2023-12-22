package com.tripsketcher.travel.user.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class LoginRequestDto {

    @NotNull(message = "로그인을 실패히였습니다.")
    @Size(max = 50, message = "로그인을 실패히였습니다.")
    @Pattern(regexp = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", message = "로그인을 실패히였습니다.")
    private String email;

    @NotNull(message = "로그인을 실패히였습니다.")
    @Size(min = 8, max = 64, message = "로그인을 실패히였습니다.")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\/-]{8,64}$", message = "로그인을 실패히였습니다.")
    private String password;
}
