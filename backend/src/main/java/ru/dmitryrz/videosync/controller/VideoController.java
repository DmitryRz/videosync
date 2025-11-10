package ru.dmitryrz.videosync.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.dmitryrz.videosync.dto.VideoRequest;
import ru.dmitryrz.videosync.dto.VideoResponse;
import ru.dmitryrz.videosync.service.VideoService;

import java.net.URI;
import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/video")
public class VideoController {
    private final VideoService videoService;

    @GetMapping()
    public ResponseEntity<List<VideoResponse>> getAllVideo() {
        List<VideoResponse> response = videoService.getAllVideo();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoResponse> getVideo(@PathVariable Long id) {
        VideoResponse response = videoService.getVideo(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<VideoResponse> uploadVideo(@RequestPart("metadata") @Valid VideoRequest request,
                                                     @RequestPart("file") MultipartFile file,
                                                     @RequestPart(value = "preview", required = false) MultipartFile preview) {

        log.info("Uploading new video: {}", request.getTitle());

        VideoResponse response = videoService.uploadVideo(request, file, preview);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.getId())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VideoResponse> updateVideo(@PathVariable Long id,
                                                     @Valid @RequestBody VideoRequest request) {
        VideoResponse response = videoService.updateVideo(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
        videoService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }
}
