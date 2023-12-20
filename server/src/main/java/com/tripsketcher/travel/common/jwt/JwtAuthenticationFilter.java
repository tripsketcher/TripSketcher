package com.tripsketcher.travel.common.jwt;

import com.tripsketcher.travel.common.exception.CustomException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        try {
            // resolve refresh token
            String refreshToken = tokenProvider.resolveRefreshToken(request);

            // checking access token
            String accessToken = tokenProvider.resolveAccessToken(request);
            String userId;
            if(accessToken == null){
                userId = tokenProvider.recreateAccessToken(refreshToken, response);
            }else{
                userId = tokenProvider.validateAccessToken(accessToken, refreshToken, response);
            }

            // getting authentication
            Authentication auth = tokenProvider.getAuthentication(userId);
            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (CustomException ex) {
            SecurityContextHolder.clearContext();
            tokenProvider.deleteRefreshTokenCookie(response);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
            return;
        }
        filterChain.doFilter(request, response);
    }
}