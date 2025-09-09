package ru.dmitryrz.videosync.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.dmitryrz.videosync.dto.request.LoginUserRequest;
import ru.dmitryrz.videosync.dto.request.RegisterUserRequest;
import ru.dmitryrz.videosync.dto.response.JwtResponse;
import ru.dmitryrz.videosync.dto.response.UserResponse;
import ru.dmitryrz.videosync.service.UserService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody @Valid LoginUserRequest request) {
        log.info("Вызов метода login");
        JwtResponse response = userService.login(request);
        log.info("Пользователь аутентифицирован успешно");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody @Valid RegisterUserRequest request) {
        log.info("Вызов метода register");
        UserResponse response = userService.register(request);
        log.info("Пользователь успешно зарегистрирован");
        return ResponseEntity.ok(response);
    }
}
