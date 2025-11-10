package ru.dmitryrz.videosync.service;

import jakarta.validation.Valid;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import ru.dmitryrz.videosync.dto.VideoRequest;
import ru.dmitryrz.videosync.dto.VideoResponse;

import java.util.List;

public interface VideoService {

    /**
     * Получает список всех видео в системе.
     *
     * @return {@link VideoResponse} список объектов, представляющих все видео
     */
    List<VideoResponse> getAllVideo();

    /**
     * Находит видео по его идентификатору.
     */
    VideoResponse getVideo(Long id);

    String getPreviewMimeType(Long id);

    /**
     * Загружает новое видео в систему.
     * Сохраняет видео файл, превью изображение и метаданные видео.
     */
    VideoResponse uploadVideo(@Valid VideoRequest request, MultipartFile video, MultipartFile preview);

    /**
     * Обновляет метаданные существующего видео.
     * Не изменяет видео файл или превью изображение.
     */
    VideoResponse updateVideo(Long id, @Valid VideoRequest request);

    /**
     * Удаляет запись из базы данных и связанные файлы (видео и превью) из файлового хранилища.
     */
    void deleteVideo(Long id);

    Resource streamVideo(Long id);

    Resource previewVideo(Long id);
}
