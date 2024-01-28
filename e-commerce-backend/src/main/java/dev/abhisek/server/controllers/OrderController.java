package dev.abhisek.server.controllers;

import dev.abhisek.server.dto.OrderRequestDto;
import dev.abhisek.server.dto.OrderResponseDto;
import dev.abhisek.server.entity.User;
import dev.abhisek.server.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDto> createOrder(@AuthenticationPrincipal User user,
                                                        @RequestParam String prodId,
                                                        @RequestParam Integer quantity,
                                                        @RequestParam Integer addId) {
        OrderRequestDto requestDto = new OrderRequestDto(prodId, quantity, addId);
        return ResponseEntity
                .accepted()
                .body(orderService.createOrder(user, requestDto));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> getAllUserOrder(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.getAllUserOrder(user));
    }


    @GetMapping("{orderId}")
    public ResponseEntity<OrderResponseDto> getUserOrderById(@AuthenticationPrincipal User user, @PathVariable String orderId) {
        return ResponseEntity.ok(orderService.getUserOrderById(user, orderId));
    }

    @DeleteMapping("{orderId}")
    public ResponseEntity<Void> cancelOrder(@AuthenticationPrincipal User user, @PathVariable String orderId) {
        orderService.cancelOrder(user, orderId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{orderId}/deliver")
    public ResponseEntity<Void> deliverOrder(@AuthenticationPrincipal User user, @PathVariable String orderId) {
        orderService.deliverOrder(user, orderId);
        return ResponseEntity.noContent().build();
    }
}
