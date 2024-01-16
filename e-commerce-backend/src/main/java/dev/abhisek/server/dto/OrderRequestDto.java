package dev.abhisek.server.dto;

public record OrderRequestDto(String productId, Integer quantity, Integer addressId) {
}
