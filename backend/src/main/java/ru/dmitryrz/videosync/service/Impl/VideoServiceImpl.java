package ru.dmitryrz.videosync.service.Impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import ru.dmitryrz.videosync.dto.VideoRequest;
import ru.dmitryrz.videosync.dto.VideoResponse;
import ru.dmitryrz.videosync.exception.VideoNotFoundException;
import ru.dmitryrz.videosync.exception.VideoProcessingException;
import ru.dmitryrz.videosync.models.Video;
import ru.dmitryrz.videosync.repository.VideoRepository;
import ru.dmitryrz.videosync.service.VideoService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {
    private final VideoRepository videoRepository;

    @Value("${app.storage.video-path}")
    private String storageVideoPath;

    @Value("${app.storage.preview-path}")
    private String storagePreviewPath;

    @Override
    public List<VideoResponse> getAllVideo() {
        return videoRepository.findAllByIsDeletedFalse().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public VideoResponse getVideo(Long id) {
        Video video = videoRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new VideoNotFoundException(id));

        return toResponse(video);
    }

    @Override
    public Resource streamVideo(Long id) {
        Video video = videoRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new VideoNotFoundException(id));

        String filename = video.getVideoPath();
        Path videoPath = Paths.get(storageVideoPath, filename);

        try {
            Resource resource = new UrlResource(videoPath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                log.error("Video file not found or not readable: {}", videoPath);
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Video file not found");
            }
        } catch (IOException e) {
            log.error("Error reading video file: {}", videoPath, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error reading video file", e);
        }
    }

    @Override
    public Resource previewVideo(Long id) {
        Video video = videoRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new VideoNotFoundException(id));

        String filename = video.getPreviewPath();
        if (filename == null || filename.isEmpty()) {
            log.warn("Preview path is missing for video ID: {}", id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Preview image not available for this video");
        }

        Path previewPath = Paths.get(storagePreviewPath, filename);

        try {
            Resource resource = new UrlResource(previewPath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                log.error("Preview file not found or not readable: {}", previewPath);
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Preview file not found in storage");
            }
        } catch (IOException e) {
            log.error("Error reading preview file: {}", previewPath, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error reading preview file", e);
        }
    }

    @Override
    public String getPreviewMimeType(Long id) {
        Video video = videoRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new VideoNotFoundException(id));

        String filename = video.getPreviewPath();
        if (filename == null || filename.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Preview image not available");
        }

        Path previewPath = Paths.get(storagePreviewPath, filename);

        try {
            String mimeType = Files.probeContentType(previewPath);
            if (mimeType != null) {
                return mimeType;
            }
        } catch (IOException e) {
            log.warn("Could not determine MIME type for preview file: {}", previewPath, e);
        }

        return "application/octet-stream";
    }

    @Override
    public VideoResponse uploadVideo(VideoRequest request, MultipartFile video, MultipartFile preview) {
        String videoFilename = generateUniqueFilename(video, request.getTitle());
        String previewFilename = generateUniqueFilename(preview, request.getTitle());

        Path videoPath = Paths.get(storageVideoPath, videoFilename);
        Path previewPath = Paths.get(storagePreviewPath, previewFilename);
        try {
            Files.copy(video.getInputStream(), videoPath);
            Files.copy(preview.getInputStream(), previewPath);

        } catch (IOException e) {
            try {
                Files.deleteIfExists(videoPath);
            } catch (IOException deleteException) {
                log.warn("Failed to delete orphaned video file: {}. Reason: {}", videoPath, deleteException.getMessage());
            }

            throw new VideoProcessingException("Failed to process video file", e);
        }


        Video savedVideo = Video.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .videoPath(videoFilename)
                .previewPath(previewFilename)
                .contentType(video.getContentType())
                .size(video.getSize())
                .width(0)
                .height(0)
                .duration(0L)
                .updatedAt(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();

        savedVideo = videoRepository.save(savedVideo);

        return toResponse(savedVideo);
    }

    @Override
    public VideoResponse updateVideo(Long id, VideoRequest request) {
        Video video = videoRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new VideoNotFoundException(id));

        video.setTitle(request.getTitle());
        video.setDescription(request.getDescription());

        Video savedVideo = videoRepository.save(video);
        return toResponse(savedVideo);
    }

    @Override
    public void deleteVideo(Long id) {
        Video video = videoRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new VideoNotFoundException(id));

        video.setDeletedAt(LocalDateTime.now());
        video.setIsDeleted(true);

        videoRepository.save(video);
    }

    private String generateUniqueFilename(MultipartFile file, String title) {
        String baseName = UUID.randomUUID().toString();
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        return generateSlug(title) + "-" + baseName.substring(0, 8) + fileExtension;
    }

    private String generateSlug(String text) {
        if (text == null || text.trim().isEmpty()) {
            return "file";
        }

        String slug = text.trim().toLowerCase();

        slug = transliterate(slug);

        return slug
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("[\\s_]+", "-")
                .replaceAll("^-|-$", "");
    }

    // Вспомогательный метод для транслитерации кириллицы
    private String transliterate(String text) {
        String[] cyrillic = "а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я".split(",");
        String[] latin = "a,b,v,g,d,e,yo,zh,z,i,y,k,l,m,n,o,p,r,s,t,u,f,kh,ts,ch,sh,sch,,y,,e,yu,ya".split(",");

        for (int i = 0; i < cyrillic.length; i++) {
            text = text.replace(cyrillic[i], latin[i]);
        }

        return text;
    }


    private VideoResponse toResponse(Video video) {
        return VideoResponse.builder()
                .id(video.getId())
                .title(video.getTitle())
                .description(video.getDescription())
                .build();
    }
}
