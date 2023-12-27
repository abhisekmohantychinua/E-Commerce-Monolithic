package dev.abhisek.server.dto;

import org.springframework.web.multipart.MultipartFile;

public record ProductRequestDto(String name, String category, int price, int quantity, MultipartFile image) {
}

