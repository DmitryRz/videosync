package ru.dmitryrz.videosync.service.Impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.dmitryrz.videosync.dto.UserResponse;
import ru.dmitryrz.videosync.models.User;
import ru.dmitryrz.videosync.repository.UserRepository;
import ru.dmitryrz.videosync.service.UserService;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserResponse getUser(UserDetails userDetails) {
        log.debug("Getting user by username: {}", userDetails.getUsername());

        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> {
                    log.warn("User not found with username: {}", userDetails.getUsername());
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
                });

        log.debug("Successfully retrieved user: {}", user.getUsername());
        return mapToResponse(user);
    }

    private UserResponse mapToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRoles())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
