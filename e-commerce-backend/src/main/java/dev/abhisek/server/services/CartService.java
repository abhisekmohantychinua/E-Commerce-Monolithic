package dev.abhisek.server.services;

import dev.abhisek.server.dto.CartResponseDto;
import dev.abhisek.server.entity.User;

import java.util.List;

public interface CartService {

    CartResponseDto addProductToCart(User user, String productId, Integer quantity);

    List<CartResponseDto> getAllCartOfUser(User user);

    CartResponseDto getUserCartById(User user, Integer cartId);

    void removeCart(User user, Integer cartId);

    CartResponseDto updateCartProductQuantity(User user, Integer cartId, Integer quantity);

}
