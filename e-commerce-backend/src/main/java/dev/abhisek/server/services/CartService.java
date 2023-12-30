package dev.abhisek.server.services;

import dev.abhisek.server.dto.CartResponseDto;

import java.util.List;

public interface CartService {
    CartResponseDto addProductToCart(String id, String productId, Integer quantity);

    List<CartResponseDto> getAllCartOfUser(String id);

    CartResponseDto getUserCartById(String id, Integer cartId);

    void removeCart(String id, Integer cartId);

    CartResponseDto updateCartProductQuantity(String id, Integer cartId, Integer quantity);
}
