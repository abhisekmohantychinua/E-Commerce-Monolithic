package dev.abhisek.server.services.impl;

import dev.abhisek.server.dto.CartResponseDto;
import dev.abhisek.server.dto.ProductResponseDto;
import dev.abhisek.server.entity.Cart;
import dev.abhisek.server.entity.Product;
import dev.abhisek.server.entity.User;
import dev.abhisek.server.exceptions.ResourceNotFoundException;
import dev.abhisek.server.repository.CartRepository;
import dev.abhisek.server.repository.ProductRepository;
import dev.abhisek.server.repository.UserRepository;
import dev.abhisek.server.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private CartResponseDto toCartResponseDto(Cart cart) {
        ProductResponseDto responseDto = new ProductResponseDto(
                cart.getProduct().getId(),
                cart.getProduct().getName(),
                cart.getProduct().getCategory().toString(),
                cart.getProduct().getPrice(),
                cart.getProduct().getQuantity()
        );
        return new CartResponseDto(cart.getId(), responseDto, cart.getQuantity());
    }

    @Override
    public CartResponseDto addProductToCart(User user, String productId, Integer quantity) {
        Product product = productRepository
                .findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Requested Product Not Found On Server."));

        Cart cart = new Cart();
        cart.setProduct(product);
        cart.setQuantity(quantity);
        cart = cartRepository.save(cart);

        user = userRepository
                .findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User Not found"));
        List<Cart> carts = user.getCarts();
        carts.add(cart);

        user.setCarts(carts);
        userRepository.save(user);

        return toCartResponseDto(cart);
    }

    @Override
    public List<CartResponseDto> getAllCartOfUser(User user) {
        user = userRepository
                .findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User Not found"));
        List<Cart> userCarts = user.getCarts();
        return userCarts
                .stream()
                .map(this::toCartResponseDto)
                .toList();
    }

    @Override
    public CartResponseDto getUserCartById(User user, Integer cartId) {
        user = userRepository
                .findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User Not found"));
        List<Cart> userCarts = user.getCarts();
        Cart cart = userCarts
                .stream()
                .filter((c) -> c.getId().equals(cartId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Requested Cart Not Found On Server."));

        return toCartResponseDto(cart);
    }

    @Override
    public void removeCart(User user, Integer cartId) {

        user = userRepository
                .findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User Not found"));
        List<Cart> userCarts = user.getCarts();
        userCarts = userCarts
                .stream()
                .filter((c) -> !c.getId().equals(cartId))
                .collect(Collectors.toList());
        user.setCarts(userCarts);

        userRepository.save(user);
        cartRepository.deleteById(cartId);
    }

    @Override
    public CartResponseDto updateCartProductQuantity(User user, Integer cartId, Integer quantity) {

        Cart cart = cartRepository
                .findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found on Server"));

        cart.setQuantity(quantity);
        cartRepository.save(cart);

        return toCartResponseDto(cart);
    }


}
