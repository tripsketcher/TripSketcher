package com.tripsketcher.travel.common.security;

import com.tripsketcher.travel.common.exception.ErrorType;
import com.tripsketcher.travel.user.entity.Users;
import com.tripsketcher.travel.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Users user = userRepository.findByIdAndDeletedDateIsNull(Long.parseLong(userId)).orElseThrow(() -> new UsernameNotFoundException(ErrorType.NOT_FOUND_USER.getMsg()));
        return null;
    }
}
