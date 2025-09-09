package ru.dmitryrz.videosync.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponse {
    String token;
}
