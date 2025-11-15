package ru.dmitryrz.videosync.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.dmitryrz.videosync.dto.RoomRequest;
import ru.dmitryrz.videosync.dto.RoomResponse;
import ru.dmitryrz.videosync.models.Room;
import ru.dmitryrz.videosync.repository.RoomRepository;
import ru.dmitryrz.videosync.service.RoomService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public RoomResponse createRoom(RoomRequest request, Long userId) {
        String shortId = generateUniqueId();

        Room.RoomBuilder roomBuilder = Room.builder()
                .uuid(shortId)
                .isPrivate(request.isPrivate());

        if (request.isPrivate()) {
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                throw new IllegalArgumentException("Private room requires a password.");
            }
            roomBuilder.password(passwordEncoder.encode(request.getPassword()));
        }

        Room room = roomBuilder.build();
        Room savedRoom = roomRepository.save(room);

        return RoomResponse.builder()
                .id(savedRoom.getId())
                .isPrivate(savedRoom.isPrivate())
                .password(savedRoom.getPassword())
                .uuid(savedRoom.getUuid())
                .build();
    }



    private String generateUniqueId() {
        String shortId;
        do {
            shortId = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 12);
        } while (roomRepository.existsByUuid(shortId));
        return shortId;
    }
}
