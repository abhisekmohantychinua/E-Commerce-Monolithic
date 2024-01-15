package dev.abhisek.server.controllers;

import dev.abhisek.server.dto.AuthRequest;
import dev.abhisek.server.dto.AuthResponse;
import dev.abhisek.server.dto.UserRequestDto;
import dev.abhisek.server.dto.UserResponseDto;
import dev.abhisek.server.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("signup")
    public ResponseEntity<UserResponseDto> register(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.accepted().body(authService.addUser(userRequestDto));
    }

    @PostMapping("signin")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.loginUser(request));
    }

    @GetMapping("verify")
    public ResponseEntity<Boolean> verifyUsername(@RequestParam String username) {
        return ResponseEntity.ok(authService.verifyUsername(username));
    }
}
