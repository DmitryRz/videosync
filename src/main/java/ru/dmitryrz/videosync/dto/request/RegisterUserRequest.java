package ru.dmitryrz.videosync.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class RegisterUserRequest {
    @NotBlank
    String username;
    @NotBlank
    @Email
    String email;
    @NotBlank
    @Size(min = 6, message = "Пароль должен содержать минимум 8 символов")
    String password;
}
