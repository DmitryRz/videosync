package ru.dmitryrz.videosync.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import ru.dmitryrz.videosync.models.Role;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Set<Role> role = new HashSet<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
