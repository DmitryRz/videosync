package ru.dmitryrz.videosync.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserResponse {
    Integer id;
    String username;
    String email;
}
