package dev.abhisek.server.dto;

public record CartResponseDto(Integer id, ProductResponseDto product, Integer quantity) {
}
