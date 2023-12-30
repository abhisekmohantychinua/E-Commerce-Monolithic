package dev.abhisek.server.services.impl;

import dev.abhisek.server.dto.ProductImageResponseDto;
import dev.abhisek.server.dto.ProductRequestDto;
import dev.abhisek.server.dto.ProductResponseDto;
import dev.abhisek.server.entity.Category;
import dev.abhisek.server.entity.Product;
import dev.abhisek.server.exceptions.ResourceNotFoundException;
import dev.abhisek.server.repository.ProductRepository;
import dev.abhisek.server.services.ImageService;
import dev.abhisek.server.services.ProductService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ImageService imageService;

    public ProductServiceImpl(ProductRepository productRepository, ImageService imageService) {
        this.productRepository = productRepository;
        this.imageService = imageService;
    }

    private ProductResponseDto productToDto(Product product) {
        return new ProductResponseDto(
                product.getId(),
                product.getName(),
                product.getCategory().toString(),
                product.getPrice(),
                product.getQuantity()
        );
    }

    @Override
    public ProductResponseDto addProduct(ProductRequestDto productRequest) throws IOException {
        Product product = new Product();
        product.setId(UUID.randomUUID().toString());
        product.setName(productRequest.name());
        product.setCategory(Category.valueOf(productRequest.category()));
        product.setPrice(productRequest.price());
        product.setQuantity(productRequest.quantity());
        product.setImgUrl(imageService.saveImage(productRequest.image()));

        productRepository.save(product);

        return productToDto(product);
    }

    @Override
    public ProductResponseDto getProductById(String id) {
        Product product = productRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Requested Product Not Found On Server."));
        return productToDto(product);
    }

    @Override
    public List<ProductResponseDto> getProductsByCategory(String category) {
        List<Product> products = productRepository.findAllByCategory(Category.valueOf(category));
        return products
                .stream()
                .map(this::productToDto)
                .toList();
    }

    @Override
    public ProductImageResponseDto getImageById(String id) throws FileNotFoundException {
        Product product = productRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Requested Product Not Found On Server."));
        InputStream inputStream = imageService.fetchImage(product.getImgUrl());
        String mediaType = product.getImgUrl().contains(".jpg") || product.getImgUrl().contains(".jpeg") ? MediaType.IMAGE_JPEG_VALUE : MediaType.IMAGE_PNG_VALUE;
        return new ProductImageResponseDto(inputStream, mediaType);
    }

    @Override
    public void removeProduct(String id) {
        Product product = productRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Requested Product Not Found On Server."));
        imageService.removeImage(product.getImgUrl());
        productRepository.delete(product);
    }


}
