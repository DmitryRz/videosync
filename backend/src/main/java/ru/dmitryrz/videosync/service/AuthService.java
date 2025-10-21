package ru.dmitryrz.videosync.service;

import ru.dmitryrz.videosync.dto.AuthResponse;
import ru.dmitryrz.videosync.dto.UserResponse;

public interface AuthService {
    AuthResponse signIn(String username, String password);

    AuthResponse signUp(String username, String password);

    AuthResponse refreshToken(String refreshToken);

    UserResponse getUser();
}
