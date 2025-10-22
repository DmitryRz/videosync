package ru.dmitryrz.videosync.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.dmitryrz.videosync.dto.AuthResponse;
import ru.dmitryrz.videosync.dto.RefreshTokenRequest;
import ru.dmitryrz.videosync.dto.SignInRequest;
import ru.dmitryrz.videosync.dto.SignUpRequest;
import ru.dmitryrz.videosync.service.AuthService;


@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@Valid @RequestBody SignUpRequest request) {
        log.info("Sign up USER with username: {}", request.getUsername());
        AuthResponse response = authService.signUp(request.getUsername(), request.getEmail(), request.getPassword());
        log.debug("User {} successfully registered", request.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@Valid @RequestBody SignInRequest request) {
        log.info("Sign in USER with username: {}", request.getUsername());
        AuthResponse response = authService.signIn(request.getUsername(), request.getPassword());
        log.debug("User {} successfully signed in", request.getUsername());
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refreshToken(request.getRefreshToken());
        return ResponseEntity.ok().body(response);
    }
}