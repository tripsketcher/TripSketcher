package com.tripsketcher.travel.common.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripsketcher.travel.common.exception.ErrorResponse;
import com.tripsketcher.travel.common.exception.ErrorType;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;

public class JwtAccessDeniedHandler implements AccessDeniedHandler {
    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    public JwtAccessDeniedHandler(JwtTokenProvider jwtTokenProvider, ObjectMapper objectMapper) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.objectMapper = objectMapper;
    }

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, org.springframework.security.access.AccessDeniedException accessDeniedException) throws IOException {
        String token = jwtTokenProvider.resolveToken(request);
        JwtCode code = jwtTokenProvider.validateToken(token);
        ErrorResponse errorResponse = null;

        response.setContentType("application/json");
        switch (code) {
            case ACCESS -> {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                errorResponse = ErrorResponse.builder()
                        .status(ErrorType.NOT_VALID_ROLE.getCode())
                        .msg(ErrorType.NOT_VALID_ROLE.getMsg())
                        .build();
            }
            case EXPIRED -> {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                errorResponse = ErrorResponse.builder()
                        .status(ErrorType.TOKEN_EXPIRED.getCode())
                        .msg(ErrorType.TOKEN_EXPIRED.getMsg())
                        .build();
            }
            case DENIED -> {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                errorResponse = ErrorResponse.builder()
                        .status(ErrorType.NOT_VALID_TOKEN.getCode())
                        .msg(ErrorType.NOT_VALID_TOKEN.getMsg())
                        .build();
            }
        }
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
