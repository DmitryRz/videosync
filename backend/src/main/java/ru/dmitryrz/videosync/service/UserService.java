package ru.dmitryrz.videosync.service;

import org.springframework.security.core.userdetails.UserDetails;
import ru.dmitryrz.videosync.dto.UserResponse;

public interface UserService {
    UserResponse getUser(UserDetails userDetails);
}
