package ru.dmitryrz.videosync.service.Impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.dmitryrz.videosync.dto.UpdateUserRequest;
import ru.dmitryrz.videosync.dto.UserResponse;
import ru.dmitryrz.videosync.models.User;
import ru.dmitryrz.videosync.models.UserDetailsImpl;
import ru.dmitryrz.videosync.repository.UserRepository;
import ru.dmitryrz.videosync.service.UserService;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserResponse getUser(UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> {
                    log.warn("User not found with username: {}", userDetails.getUsername());
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
                });
        return mapToResponse(user);
    }

    @Override
    public UserResponse updateUser(UserDetailsImpl userDetails, UpdateUserRequest request) {
        User user = userRepository.findById(userDetails.getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        );

        if (request.getUsername() != null && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsernameAndIdNot(request.getUsername(), user.getId())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already taken");
            }
            user.setUsername(request.getUsername());
        }

        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmailAndIdNot(request.getEmail(), user.getId())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already taken");
            }
            user.setEmail(request.getEmail());
        }

        User updatedUser = userRepository.save(user);
        return mapToResponse(updatedUser);
    }

    @Override
    public void deleteUser(UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        );

        user.setIsDeleted(true);
        userRepository.save(user);
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
