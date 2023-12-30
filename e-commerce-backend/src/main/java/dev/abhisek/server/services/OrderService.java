package dev.abhisek.server.services;

import dev.abhisek.server.dto.OrderRequestDto;
import dev.abhisek.server.dto.OrderResponseDto;

import java.util.List;

public interface OrderService {
    OrderResponseDto createOrder(OrderRequestDto requestDto);

    void deliverOrder(String id);

    void cancelOrder(String id);

    List<OrderResponseDto> getAllUserOrder(String id);

    OrderResponseDto getUserOrderById(String id, String orderId);

}
