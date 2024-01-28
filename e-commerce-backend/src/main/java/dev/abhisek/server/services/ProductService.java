package dev.abhisek.server.services;

import dev.abhisek.server.dto.ProductImageResponseDto;
import dev.abhisek.server.dto.ProductRequestDto;
import dev.abhisek.server.dto.ProductResponseDto;
import dev.abhisek.server.entity.Category;
import org.springframework.security.access.prepost.PreAuthorize;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

public interface ProductService {

    @PreAuthorize("hasAuthority('ADMIN')")
    ProductResponseDto addProduct(ProductRequestDto productRequest) throws IOException;

    @PreAuthorize("hasAuthority('ADMIN')")
    List<ProductResponseDto> advanceProductSearch(String query, String searchBy);

    ProductResponseDto getProductById(String id);

    List<ProductResponseDto> getAllProduct(Integer pageNo, Category categories, String orderBy);

    ProductImageResponseDto getImageById(String id) throws FileNotFoundException;

    @PreAuthorize("hasAuthority('ADMIN')")
    void removeProduct(String id);
}
