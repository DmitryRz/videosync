package ru.dmitryrz.videosync.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.dmitryrz.videosync.dto.AuthResponse;
import ru.dmitryrz.videosync.models.Role;
import ru.dmitryrz.videosync.models.User;
import ru.dmitryrz.videosync.repository.UserRepository;
import ru.dmitryrz.videosync.service.JwtService;
import ru.dmitryrz.videosync.service.AuthService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Override
    public AuthResponse signIn(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );

        String accessToken = jwtService.generateAccessToken(authentication.getName());
        String refreshToken = jwtService.generateRefreshToken(authentication.getName());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public AuthResponse signUp(String username, String email, String password) {
        Optional<User> existingUser = userRepository.findByUsernameOrEmail(username, email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getUsername().equals(username)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Имя пользователя уже существует");
            } else {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Почта уже существует");
            }
        }


        User user = User.builder()
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(password))
                .roles(Set.of(Role.USER))
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);
        return signIn(username, password);
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtService.isTokenValid(refreshToken)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid refresh token");
        }

        String username = jwtService.extractUsername(refreshToken);
        String newAccessToken = jwtService.generateAccessToken(username);
        String newRefreshToken = jwtService.generateRefreshToken(username);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }
}
