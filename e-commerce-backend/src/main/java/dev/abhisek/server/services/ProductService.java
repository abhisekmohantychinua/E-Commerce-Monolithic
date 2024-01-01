package dev.abhisek.server.services;

import dev.abhisek.server.dto.ProductImageResponseDto;
import dev.abhisek.server.dto.ProductRequestDto;
import dev.abhisek.server.dto.ProductResponseDto;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductResponseDto addProduct(ProductRequestDto productRequest) throws IOException;

    ProductResponseDto getProductById(String id);

    List<ProductResponseDto> getAllProduct(Integer pageNo);

    List<ProductResponseDto> getProductsByCategory(String category);

    ProductImageResponseDto getImageById(String id) throws FileNotFoundException;

    void removeProduct(String id);
}
