package dev.abhisek.server.controllers;

import dev.abhisek.server.dto.OrderRequestDto;
import dev.abhisek.server.dto.OrderResponseDto;
import dev.abhisek.server.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/{id}/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDto> createOrder(@PathVariable String id,
                                                        @RequestParam String prodId,
                                                        @RequestParam Integer quantity,
                                                        @RequestParam Integer addId) {
        OrderRequestDto requestDto = new OrderRequestDto(id, prodId, quantity, addId);
        return ResponseEntity
                .accepted()
                .body(orderService.createOrder(requestDto));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> getAllUserOrder(@PathVariable String id) {
        return ResponseEntity.ok(orderService.getAllUserOrder(id));
    }

    @GetMapping("{orderId}")
    public ResponseEntity<OrderResponseDto> getUserOrderById(@PathVariable String id, @PathVariable String orderId) {
        return ResponseEntity.ok(orderService.getUserOrderById(id, orderId));
    }

    @DeleteMapping("{orderId}")
    public ResponseEntity<Void> cancelOrder(@PathVariable String id, @PathVariable String orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{orderId}/deliver")
    public ResponseEntity<Void> deliverOrder(@PathVariable String id, @PathVariable String orderId) {
        orderService.deliverOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}
