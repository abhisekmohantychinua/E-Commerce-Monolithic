package dev.abhisek.server.services.impl;

import dev.abhisek.server.dto.AddressRequestDto;
import dev.abhisek.server.dto.OrderRequestDto;
import dev.abhisek.server.dto.OrderResponseDto;
import dev.abhisek.server.dto.ProductResponseDto;
import dev.abhisek.server.entity.Address;
import dev.abhisek.server.entity.Order;
import dev.abhisek.server.entity.Product;
import dev.abhisek.server.entity.User;
import dev.abhisek.server.exceptions.OrderException;
import dev.abhisek.server.exceptions.ResourceNotFoundException;
import dev.abhisek.server.repository.AddressRepository;
import dev.abhisek.server.repository.OrderRepository;
import dev.abhisek.server.repository.ProductRepository;
import dev.abhisek.server.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;

    private OrderResponseDto toOrderResponseDto(Order order) {
        ProductResponseDto responseDto = new ProductResponseDto(
                order.getProduct().getId(),
                order.getProduct().getName(),
                order.getProduct().getCategory().toString(),
                order.getProduct().getPrice(),
                order.getProduct().getQuantity());

        AddressRequestDto address = new AddressRequestDto(
                order.getAddress().getAddress(),
                order.getAddress().getCity(),
                order.getAddress().getZip(),
                order.getAddress().getPhone());

        return new OrderResponseDto(
                order.getId(),
                responseDto,
                order.getQuantity(),
                (order.getQuantity() * responseDto.price()),
                order.getCreatedAt(),
                order.isDelivered() ? "DELIVERED" : "NOT DELIVERED",
                address);
    }

    @Override
    public List<OrderResponseDto> getAllOrder() {
        return orderRepository.findAll()
                .stream()
                .map(this::toOrderResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDto getOrderById(String orderId) {
        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order is not available on server"));
        return toOrderResponseDto(order);
    }

    @Override
    public OrderResponseDto createOrder(User user, OrderRequestDto requestDto) {

        Product product = productRepository
                .findById(requestDto.productId())
                .orElseThrow(() -> new ResourceNotFoundException("Requested product not found on server."));

        Address address = addressRepository
                .findById(requestDto.addressId())
                .orElseThrow(() -> new ResourceNotFoundException("Address is not found on server."));

        if (product.getQuantity() < requestDto.quantity()) {
            throw new OrderException("Product unavailable with this quantity");
        }

        Order order = new Order();
        order.setId(UUID.randomUUID().toString());
        order.setUser(user);
        order.setProduct(product);
        order.setAddress(address);
        order.setCreatedAt(new Date());
        order.setDelivered(false);
        order.setQuantity(requestDto.quantity());
        order = orderRepository.save(order);


        product.setQuantity(product.getQuantity() - order.getQuantity());
        productRepository.save(product);

        return toOrderResponseDto(order);
    }

    @Override
    public void deliverOrder(User user, String id) {
        Order order = orderRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Order is not available on server"));

        if (order.isDelivered()) {
            throw new OrderException("Order already delivered");
        }

        order.setDelivered(true);
        orderRepository.save(order);
    }

    @Override
    public void cancelOrder(User user, String id) {
        Order order = orderRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Order is not available on server"));

        if (order.isDelivered()) {
            throw new OrderException("Order already delivered, can't canceled.");
        }

        Product product = productRepository
                .findById(order.getProduct().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product id unavailable."));


        product.setQuantity(product.getQuantity() + order.getQuantity());
        productRepository.save(product);

        orderRepository.delete(order);
    }

    @Override
    public List<OrderResponseDto> getAllUserOrder(User user) {
        List<Order> orders = orderRepository.findAllByUser(user);

        return orders
                .stream()
                .map(this::toOrderResponseDto)
                .toList();
    }

    @Override
    public List<OrderResponseDto> getAllUserOrderById(String id) {
        User user = new User();
        user.setId(id);

        return orderRepository.findAllByUser(user)
                .stream().map(this::toOrderResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDto getUserOrderById(User user, String orderId) {
        Order order = orderRepository
                .findByIdAndUser(orderId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Requested Order not available"));

        return toOrderResponseDto(order);
    }
}
