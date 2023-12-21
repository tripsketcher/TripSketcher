package com.tripsketcher.travel.user.service;

import com.tripsketcher.travel.common.exception.CustomException;
import com.tripsketcher.travel.common.exception.ErrorType;
import com.tripsketcher.travel.common.handler.TransactionHandler;
import com.tripsketcher.travel.common.jwt.JwtTokenProvider;
import com.tripsketcher.travel.common.redis.RedisLockRepository;
import com.tripsketcher.travel.user.dto.request.*;
import com.tripsketcher.travel.user.dto.response.PublicUserInfo;
import com.tripsketcher.travel.user.entity.Nickname;
import com.tripsketcher.travel.user.entity.Users;
import com.tripsketcher.travel.user.repository.NicknameRepository;
import com.tripsketcher.travel.user.repository.UsersRepository;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ApiUsersService {

    private final Random random;
    private final PasswordEncoder passwordEncoder;
    private final UsersRepository usersRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final JavaMailSender mailSender;
    private final StringRedisTemplate redisTemplate;
    private final NicknameRepository nicknameRepository;
    private final RedisLockRepository redisLockRepository;
    private final TransactionHandler transactionHandler;

    private final int MAX_EMAIL_REQUESTS = 3;
    private final int TIME_LIMIT_MINUTES = 3;
    private final int VERIFICATION_CODE_SIZE = 10;
    private final int NEW_PASSWORD_SIZE = 8;

    // service method

    public void duplicateEmail(String email){
        if(usersRepository.findByUserEmailAndDeletedDateIsNull(email).isPresent()){
            throw new CustomException(ErrorType.ALREADY_EXIST_USER_EMAIL);
        }
    }

    public void sendVerificationEmail(EmailAuthenticationRequestDto requestDto){
        String email = requestDto.getEmail();
        checkEmailRequestLimit(email);

        String verificationCode = getAuthenticationCode(email);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Trip Sketcher Verification Code");
        message.setText("Your verification code is: " + verificationCode);
        mailSender.send(message);

        updateRequestCount(email);
    }

    public void verificationEmail(EmailAuthenticationCodeRequestDto requestDto){
        String codeKey = "email_authentication_code:" + requestDto.getEmail();
        String code = requestDto.getCode();

        String codeVal = redisTemplate.opsForValue().get(codeKey);
        if(codeVal == null){
            throw new CustomException(ErrorType.EMAIL_REQUEST_LIMIT_EXCEEDED);
        }
        if(!codeVal.equals(code)){
            throw new CustomException(ErrorType.VERIFICATION_CODE_MISMATCH);
        }

        String authorizedEmail = "authorized_email:" + requestDto.getEmail();
        duplicateEmail(requestDto.getEmail());
        redisTemplate.opsForValue().set(authorizedEmail, requestDto.getEmail(), 1, TimeUnit.HOURS);
    }

    public void join(JoinRequestDto requestDto){
        String lockKey = "user_join_lock";
        redisLockRepository.runOnLock(lockKey, () -> {
            transactionHandler.runOnWriteTransaction(() -> {
                String email = requestDto.getEmail();
                String password = requestDto.getPassword();

                duplicateEmail(email);

                if (Boolean.FALSE.equals(redisTemplate.hasKey("authorized_email:" + email))) {
                    throw new CustomException(ErrorType.VERIFICATION_CODE_NOT_FOUND);
                }

                Users user = Users.builder()
                        .userEmail(email)
                        .userPassword(passwordEncoder.encode(password))
                        .userNickname(getRandomNickname())
                        .build();

                usersRepository.save(user);
                return null;
            });
            return null;
        });
    }

    public PublicUserInfo publicUserInfo(String userNickname){
        validateUserNickname(userNickname);

        Users user = usersRepository.findByUserNicknameAndDeletedDateIsNull(userNickname)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_USER));

        return PublicUserInfo.builder()
                .userProfileImage(user.getUserProfileImage())
                .build();
    }

    @Transactional
    public void login(LoginRequestDto requestDto, HttpServletResponse response){
        String email = requestDto.getEmail();
        String password = requestDto.getPassword();

        Users user = usersRepository.findByUserEmailAndDeletedDateIsNull(email)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_USER));

        if(!passwordEncoder.matches(password, user.getUserPassword())){
            if(user.getFailedLoginAttempts() < 5){
                user.setFailedLoginAttempts(user.getFailedLoginAttempts() + 1);
            }
            if(user.getFailedLoginAttempts() >= 5 && user.isAccountNonLocked()){
                user.setNonLocked(false);
                user.setUserPassword(sendNewPassword(email));
                usersRepository.save(user);
                throw new CustomException(ErrorType.ACCOUNT_LOCKED);
            }
            usersRepository.save(user);
            throw new CustomException(ErrorType.INVALID_LOGIN);
        }

        user.setFailedLoginAttempts(0);
        user.setNonLocked(true);
        usersRepository.save(user);

        jwtTokenProvider.createAccessToken(user.getUsername(), response);
        jwtTokenProvider.createRefreshToken(user.getUsername(), response);
    }

    public void passwordReset(PasswordResetRequestDto requestDto){
        String email = requestDto.getEmail();
        String sentEmailKey = "reset_password_email:"+email;

        Users user = usersRepository.findByUserEmailAndDeletedDateIsNull(email)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_USER));

        if(Boolean.TRUE.equals(redisTemplate.hasKey(sentEmailKey))){
            throw new CustomException(ErrorType.EMAIL_REQUEST_LIMIT_EXCEEDED);
        }

        redisTemplate.opsForValue().set(sentEmailKey, email, 3, TimeUnit.MINUTES);
        user.setUserPassword(sendNewPassword(email));
        usersRepository.save(user);
    }

    // service internal method

    private void checkEmailRequestLimit(String email){
        String countKey = "email_count:" + email;
        String countStr = redisTemplate.opsForValue().get(countKey);
        int count = countStr != null ? Integer.parseInt(countStr) : 0;

        if(count >= MAX_EMAIL_REQUESTS){
            throw new CustomException(ErrorType.EMAIL_REQUEST_LIMIT_EXCEEDED);
        }
    }

    private void updateRequestCount(String email) {
        String countKey = "email_count:" + email;
        String countStr = redisTemplate.opsForValue().get(countKey);
        if(countStr == null){
            redisTemplate.opsForValue().set(countKey, "0", TIME_LIMIT_MINUTES, TimeUnit.MINUTES);
        }else{
            redisTemplate.opsForValue().increment(countKey, 1);
        }
    }

    /**
     * Generates a random verification code with the specified length.
     * The code will contain at least one uppercase letter, one lowercase letter, one number, and one special character.
     *
     * @param length the length of the verification code. Must be 4 or more.
     * @return the generated verification code
     * @throws IllegalArgumentException if length is less than 4
     */
    private String generateVerificationCode(int length) {
        if (length < 4) {
            throw new IllegalArgumentException("Length must be at least 4");
        }

        String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialCharacters = "!@#$%^&*()_+{}\\[\\]:;<>,.?~\\/-";
        String combinedChars = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);

        sb.append(upperCaseLetters.charAt(random.nextInt(upperCaseLetters.length())));
        sb.append(lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length())));
        sb.append(numbers.charAt(random.nextInt(numbers.length())));
        sb.append(specialCharacters.charAt(random.nextInt(specialCharacters.length())));

        for (int i = 4; i < length; i++) {
            sb.append(combinedChars.charAt(random.nextInt(combinedChars.length())));
        }

        return sb.toString();
    }


    private String getAuthenticationCode(String email){
        String codeKey = "email_authentication_code:" + email;
        String codeVal = redisTemplate.opsForValue().get(codeKey);
        if(codeVal == null){
            codeVal = generateVerificationCode(VERIFICATION_CODE_SIZE);
            redisTemplate.opsForValue().set(codeKey, codeVal, TIME_LIMIT_MINUTES, TimeUnit.MINUTES);
        }
        return codeVal;
    }

    private String getRandomNickname(){
        List<Nickname> allNicknames = nicknameRepository.findAll();
        if (allNicknames.isEmpty()) {
            throw new IllegalStateException("닉네임 목록이 비어있습니다.");
        }

        String finalNickname;
        do{
            StringBuilder numbers = new StringBuilder();
            for (int i = 0; i < 6; i++) {
                numbers.append(random.nextInt(10));
            }
            Nickname randomNickname = allNicknames.get(random.nextInt(allNicknames.size()));
            finalNickname = "@" + randomNickname.getKoreanNickname() + numbers;
        }while (usersRepository.findByUserNickname(finalNickname).isPresent());

        return finalNickname;
    }

    private void validateUserNickname(String nickname) {
        if (StringUtils.isBlank(nickname)) {
            throw new CustomException(ErrorType.NICKNAME_EMPTY);
        }
        if (nickname.length() > 50) {
            throw new CustomException(ErrorType.NICKNAME_TOO_LONG);
        }
    }

    private String sendNewPassword(String email){
        String newPassword = generateVerificationCode(NEW_PASSWORD_SIZE);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your New Password for Trip Sketcher");
        message.setText("Your new password is: " + newPassword);
        mailSender.send(message);
        return newPassword;
    }
}
