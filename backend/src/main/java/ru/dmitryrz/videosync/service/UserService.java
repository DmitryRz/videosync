package ru.dmitryrz.videosync.service;

import jakarta.validation.Valid;
import ru.dmitryrz.videosync.dto.UpdateUserRequest;
import ru.dmitryrz.videosync.dto.UserResponse;
import ru.dmitryrz.videosync.models.UserDetailsImpl;

public interface UserService {
    UserResponse getUser(UserDetailsImpl userDetails);

    UserResponse updateUser(UserDetailsImpl userDetails, @Valid UpdateUserRequest request);

    void deleteUser(UserDetailsImpl userDetails);
}
