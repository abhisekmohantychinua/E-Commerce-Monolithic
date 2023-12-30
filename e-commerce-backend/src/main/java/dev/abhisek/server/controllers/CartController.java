package dev.abhisek.server.controllers;

import dev.abhisek.server.dto.CartResponseDto;
import dev.abhisek.server.services.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/{id}/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public ResponseEntity<CartResponseDto> addProductToCart(@PathVariable String id,
                                                            @RequestParam String prodId,
                                                            @RequestParam Integer quantity) {
        return ResponseEntity
                .accepted()
                .body(cartService.addProductToCart(id, prodId, quantity));
    }

    @GetMapping
    public ResponseEntity<List<CartResponseDto>> getAllProductOfUser(@PathVariable String id) {
        return ResponseEntity.ok(cartService.getAllCartOfUser(id));
    }

    @GetMapping("{cartId}")
    public ResponseEntity<CartResponseDto> getCartById(@PathVariable String id, @PathVariable Integer cartId) {
        return ResponseEntity.ok(cartService.getUserCartById(id, cartId));
    }

    @DeleteMapping("{cartId}")
    public ResponseEntity<Void> deleteCartById(@PathVariable String id, @PathVariable Integer cartId) {
        cartService.removeCart(id, cartId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{cartId}")
    public ResponseEntity<CartResponseDto> updateCartProductQuantity(@PathVariable String id,
                                                                     @PathVariable Integer cartId,
                                                                     @RequestParam Integer quantity) {
        return ResponseEntity
                .accepted()
                .body(cartService.updateCartProductQuantity(id, cartId, quantity));
    }
}
