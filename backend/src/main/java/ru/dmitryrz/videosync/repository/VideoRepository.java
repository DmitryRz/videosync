package ru.dmitryrz.videosync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dmitryrz.videosync.models.Video;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findAllByIsDeletedFalse();
    Optional<Video> findByIdAndIsDeletedFalse(Long id);
}
