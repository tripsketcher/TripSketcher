package com.tripsketcher.travel.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tripsketcher.travel.common.exception.ErrorResponse;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponseDto<T> {

    private T data;
    private String msg;
    private ErrorResponse error;

}