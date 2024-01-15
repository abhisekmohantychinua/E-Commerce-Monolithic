package dev.abhisek.server.services;

import dev.abhisek.server.dto.CartResponseDto;
import dev.abhisek.server.entity.User;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface CartService {
    @PreAuthorize("hasAuthority('USER')")
    CartResponseDto addProductToCart(User user, String productId, Integer quantity);

    @PreAuthorize("hasAuthority('USER')")
    List<CartResponseDto> getAllCartOfUser(User user);

    @PreAuthorize("hasAuthority('USER')")
    CartResponseDto getUserCartById(User user, Integer cartId);

    @PreAuthorize("hasAuthority('USER')")
    void removeCart(User user, Integer cartId);

    @PreAuthorize("hasAuthority('USER')")
    CartResponseDto updateCartProductQuantity(User user, Integer cartId, Integer quantity);

}
