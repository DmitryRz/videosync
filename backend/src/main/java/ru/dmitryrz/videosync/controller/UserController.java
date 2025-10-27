package ru.dmitryrz.videosync.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.dmitryrz.videosync.dto.UpdateUserRequest;
import ru.dmitryrz.videosync.dto.UserResponse;
import ru.dmitryrz.videosync.models.UserDetailsImpl;
import ru.dmitryrz.videosync.service.UserService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        log.debug("Getting user info for: {}", userDetails.getUsername());
        UserResponse response = userService.getUser(userDetails);
        log.debug("Successfully returned user info for: {}", userDetails.getUsername());
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateUser(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody @Valid UpdateUserRequest request
    ) {
        UserResponse response = userService.updateUser(userDetails, request);

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        userService.deleteUser(userDetails);
        return ResponseEntity.noContent().build();
    }
}
