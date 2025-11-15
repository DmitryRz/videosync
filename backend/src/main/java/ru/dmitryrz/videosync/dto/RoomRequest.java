package ru.dmitryrz.videosync.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomRequest {
    @JsonProperty("isPrivate")
    private boolean isPrivate;
    private String password;
}
