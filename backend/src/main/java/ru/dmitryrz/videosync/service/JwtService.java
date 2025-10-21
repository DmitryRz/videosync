package ru.dmitryrz.videosync.service;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JwtService {
    String generateAccessToken(String username);

    String generateAccessToken(Map<String, Object> extraClaims, String username);

    String generateRefreshToken(String username);

    String generateRefreshToken(Map<String, Object> extraClaims, String username);

    boolean isTokenValid(String token);

    boolean isTokenValid(String token, UserDetails userDetails);

    String extractUsername(String token);
}
