package dev.abhisek.server.controllers;

import dev.abhisek.server.dto.ProductImageResponseDto;
import dev.abhisek.server.dto.ProductRequestDto;
import dev.abhisek.server.dto.ProductResponseDto;
import dev.abhisek.server.entity.Category;
import dev.abhisek.server.services.ProductService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponseDto> addProduct(
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam Integer price,
            @RequestParam Integer quantity,
            @RequestParam MultipartFile image
    ) throws IOException {
        ProductRequestDto requestDto = new ProductRequestDto(name, category, price, quantity, image);
        ProductResponseDto responseDto = productService.addProduct(requestDto);
        return ResponseEntity
                .accepted()
                .body(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> getAllProduct(
            @RequestParam(defaultValue = "0", required = false) Integer pageNo,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false, defaultValue = "LOW_TO_HIGH") String orderBy
    ) {
        return ResponseEntity.ok(productService.getAllProduct(pageNo, category, orderBy));
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductResponseDto> findProductById(@PathVariable String id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }


    @GetMapping(value = "{id}/image", produces = "image/*")
    public void fetchProductImageById(@PathVariable String id, HttpServletResponse response) throws IOException {
        ProductImageResponseDto responseDto = productService.getImageById(id);
        response.setContentType(responseDto.mediaType());
        StreamUtils.copy(responseDto.inputStream(), response.getOutputStream());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable String id) {
        productService.removeProduct(id);
        return ResponseEntity.noContent().build();
    }
}
