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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ImageService imageService;

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
    public List<ProductResponseDto> getAllProduct(Integer pageNo, Category category, String orderBy) {

        Sort sort;
        if (Objects.equals(orderBy, "HIGH_TO_LOW")) {
            sort = Sort.by("price").descending();
        } else {
            sort = Sort.by("price").ascending();
        }
        Pageable pageable = PageRequest.of(pageNo, 8, sort);

        Page<Product> productPage;
        if (category != null) {
            productPage = productRepository.findAllByCategory(category, pageable);
        } else {
            productPage = productRepository.findAll(pageable);
        }

        List<Product> products = productPage.getContent();
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
