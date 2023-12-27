package dev.abhisek.server.dto;

import java.io.InputStream;

public record ProductImageResponseDto(InputStream inputStream, String mediaType) {

}
