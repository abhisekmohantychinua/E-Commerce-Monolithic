package dev.abhisek.server.dto;

import dev.abhisek.server.entity.Address;

import java.util.List;

public record UserResponseDto(String id, String name, String email, String username, String password, String phone,
                              String role,
                              List<Address> addresses) {
}
