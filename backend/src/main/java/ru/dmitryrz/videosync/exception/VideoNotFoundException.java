package ru.dmitryrz.videosync.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Spring автоматически вернет 404
public class VideoNotFoundException extends RuntimeException {
    public VideoNotFoundException(Long id) {
        super("Video with ID " + id + " not found or is deleted.");
    }
}