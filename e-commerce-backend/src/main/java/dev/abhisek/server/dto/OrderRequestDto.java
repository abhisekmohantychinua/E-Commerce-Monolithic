package dev.abhisek.server.dto;

public record OrderRequestDto(String userId, String productId, Integer quantity, Integer addressId) {
}
