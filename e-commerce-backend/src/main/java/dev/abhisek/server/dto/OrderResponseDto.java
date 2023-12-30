package dev.abhisek.server.dto;

import java.util.Date;

public record OrderResponseDto(String id, ProductResponseDto product, Integer quantity, Integer price, Date createdAt,
                               String status,
                               AddressRequestDto address) {
}
