package ru.dmitryrz.videosync.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.dmitryrz.videosync.dto.UserResponse;
import ru.dmitryrz.videosync.service.UserService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        log.debug("Getting user info for: {}", userDetails.getUsername());
        UserResponse response = userService.getUser(userDetails);
        log.debug("Successfully returned user info for: {}", userDetails.getUsername());
        return ResponseEntity.ok().body(response);
    }
}
