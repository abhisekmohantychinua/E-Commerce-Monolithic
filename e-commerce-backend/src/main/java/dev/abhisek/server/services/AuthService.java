package dev.abhisek.server.services;

import dev.abhisek.server.dto.AuthRequest;
import dev.abhisek.server.dto.AuthResponse;
import dev.abhisek.server.dto.UserRequestDto;
import dev.abhisek.server.dto.UserResponseDto;

public interface AuthService {

    UserResponseDto addUser(UserRequestDto userRequestDto);

    AuthResponse loginUser(AuthRequest authRequest);

    boolean verifyUsername(String username);
}
