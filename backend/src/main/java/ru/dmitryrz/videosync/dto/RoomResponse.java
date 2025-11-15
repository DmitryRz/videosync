package ru.dmitryrz.videosync.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class RoomResponse {
    private Long id;
    private String uuid;
    private Boolean isPrivate;
    private String password;
}
