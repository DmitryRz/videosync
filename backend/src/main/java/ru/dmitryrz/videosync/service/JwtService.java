package ru.dmitryrz.videosync.service;

import org.springframework.security.core.userdetails.UserDetails;
import ru.dmitryrz.videosync.models.User;

/**
 * Сервис для работы с JWT токенами
 * Обеспечивает генерацию, валидацию и извлечение данных из токенов
 */
public interface JwtService {

    /**
     * Генерирует access token для пользователя
     *
     * @param user пользователь
     * @return сгенерированный access token
     */
    String generateAccessToken(User user);

    /**
     * Генерирует refresh token для пользователя
     *
     * @param user пользователь
     * @return сгенерированный refresh token
     */
    String generateRefreshToken(User user);

    /**
     * Проверяет валидность токена (срок действия и подпись)
     *
     * @param token токен для проверки
     * @return true если токен валиден, false в противном случае
     */
    boolean isTokenValid(String token);

    /**
     * Проверяет, является ли токен access token'ом
     *
     * @param token токен для проверки
     * @return true если это access token, false в противном случае
     */
    boolean isAccessToken(String token);

    /**
     * Проверяет, является ли токен refresh token'ом
     *
     * @param token токен для проверки
     * @return true если это refresh token, false в противном случае
     */
    boolean isRefreshToken(String token);

    /**
     * Проверяет валидность токена для конкретного пользователя
     *
     * @param token токен для проверки
     * @param userDetails данные пользователя
     * @return true если токен валиден для пользователя, false в противном случае
     */
    boolean isTokenValid(String token, UserDetails userDetails);

    /**
     * Извлекает идентификатор пользователя из токена
     *
     * @param token токен
     * @return идентификатор пользователя
     * @throws IllegalArgumentException если идентификатор невалиден
     */
    Long extractUserId(String token);

    /**
     * Извлекает имя пользователя из токена
     *
     * @param token токен
     * @return имя пользователя
     */
    String extractUsername(String token);
}