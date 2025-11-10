package ru.dmitryrz.videosync.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class VideoResponse {
    private Long id;
    private String title;
    private String description;
}
