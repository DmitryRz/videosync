package ru.dmitryrz.videosync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.dmitryrz.videosync.models.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
//    Optional<User> findByUsernameOrEmail(String username, String email);
}
