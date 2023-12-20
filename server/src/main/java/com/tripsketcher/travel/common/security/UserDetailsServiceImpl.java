package com.tripsketcher.travel.common.security;

import com.tripsketcher.travel.common.exception.CustomException;
import com.tripsketcher.travel.common.exception.ErrorType;
import com.tripsketcher.travel.user.entity.Users;
import com.tripsketcher.travel.user.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsersRepository usersRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Users user = usersRepository.findByIdAndDeletedDateIsNull(Long.parseLong(userId)).orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_USER));
        if(!user.isAccountNonLocked()){
            throw new CustomException(ErrorType.ACCOUNT_LOCKED);
        }
        return user;
    }
}
