package dev.abhisek.server.services;

import dev.abhisek.server.dto.OrderRequestDto;
import dev.abhisek.server.dto.OrderResponseDto;
import dev.abhisek.server.entity.User;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface OrderService {

    @PreAuthorize("hasAuthority('ADMIN')")
    List<OrderResponseDto> getAllOrder();

    @PreAuthorize("hasAuthority('ADMIN')")
    OrderResponseDto getOrderById(String orderId);

    OrderResponseDto createOrder(User user, OrderRequestDto requestDto);

    void deliverOrder(User user, String orderId);

    void cancelOrder(User user, String orderId);

    List<OrderResponseDto> getAllUserOrder(User user);

    @PreAuthorize("hasAuthority('ADMIN')")
    List<OrderResponseDto> getAllUserOrderById(String id);

    OrderResponseDto getUserOrderById(User user, String orderId);

}
