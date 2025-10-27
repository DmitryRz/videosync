package ru.dmitryrz.videosync.service;

import ru.dmitryrz.videosync.dto.AuthResponse;
import ru.dmitryrz.videosync.dto.UserResponse;

/**
 * Сервис аутентификации и авторизации.
 * Обрабатывает вход, регистрацию и обновление токенов.
 */
public interface AuthService {

    /**
     * Аутентификация пользователя
     *
     * @param username имя пользователя
     * @param password пароль
     * @return ответ с access и refresh токенами
     */
    AuthResponse signIn(String username, String password);

    /**
     * Регистрация нового пользователя
     *
     * @param username имя пользователя
     * @param email email пользователя
     * @param password пароль
     * @return ответ с access и refresh токенами
     */
    AuthResponse signUp(String username, String email, String password);

    /**
     * Обновление access и refresh токенов
     *
     * @param refreshToken валидный refresh token
     * @return ответ с новыми access и refresh токенами
     */
    AuthResponse refreshToken(String refreshToken);
}