package dev.abhisek.server.controllers;

import dev.abhisek.server.dto.CartResponseDto;
import dev.abhisek.server.entity.User;
import dev.abhisek.server.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping
    public ResponseEntity<CartResponseDto> addProductToCart(@AuthenticationPrincipal User user,
                                                            @RequestParam String prodId,
                                                            @RequestParam Integer quantity) {
        return ResponseEntity
                .accepted()
                .body(cartService.addProductToCart(user, prodId, quantity));
    }

    @GetMapping
    public ResponseEntity<List<CartResponseDto>> getAllProductOfUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getAllCartOfUser(user));
    }

    @GetMapping("{cartId}")
    public ResponseEntity<CartResponseDto> getCartById(@AuthenticationPrincipal User user, @PathVariable Integer cartId) {
        return ResponseEntity.ok(cartService.getUserCartById(user, cartId));
    }

    @DeleteMapping("{cartId}")
    public ResponseEntity<Void> deleteCartById(@AuthenticationPrincipal User user, @PathVariable Integer cartId) {
        cartService.removeCart(user, cartId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{cartId}")
    public ResponseEntity<CartResponseDto> updateCartProductQuantity(@AuthenticationPrincipal User user,
                                                                     @PathVariable Integer cartId,
                                                                     @RequestParam Integer quantity) {
        return ResponseEntity
                .accepted()
                .body(cartService.updateCartProductQuantity(user, cartId, quantity));
    }
}
