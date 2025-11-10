package ru.dmitryrz.videosync.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VideoRequest {
    private Long id;
    private String title;
    private String description;
}
