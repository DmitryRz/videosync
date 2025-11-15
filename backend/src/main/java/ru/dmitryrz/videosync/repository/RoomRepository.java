package ru.dmitryrz.videosync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dmitryrz.videosync.models.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
    boolean existsByUuid(String shortId);
}
