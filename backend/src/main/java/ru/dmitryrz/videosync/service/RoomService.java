package ru.dmitryrz.videosync.service;

import ru.dmitryrz.videosync.dto.RoomRequest;
import ru.dmitryrz.videosync.dto.RoomResponse;

public interface RoomService {
    RoomResponse createRoom(RoomRequest request, Long userId);
}
