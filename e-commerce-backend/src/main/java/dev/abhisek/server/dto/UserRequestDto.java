package dev.abhisek.server.dto;

public record UserRequestDto(String name, String email, String username, String password, String phone, String role) {
}
