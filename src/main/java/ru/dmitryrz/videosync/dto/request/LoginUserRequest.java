package ru.dmitryrz.videosync.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class LoginUserRequest {
    @NotBlank
    String username;
    @NotBlank
    @Size(min = 6, message = "Пароль должен содержать минимум 8 символов")
    String password;
}