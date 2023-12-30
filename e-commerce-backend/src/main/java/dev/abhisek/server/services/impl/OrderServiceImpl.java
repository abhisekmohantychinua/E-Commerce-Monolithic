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
import dev.abhisek.server.repository.UserRepository;
import dev.abhisek.server.services.OrderService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;

    public OrderServiceImpl(UserRepository userRepository, ProductRepository productRepository, OrderRepository orderRepository, AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
    }

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
    public OrderResponseDto createOrder(OrderRequestDto requestDto) {
        User user = userRepository
                .findById(requestDto.userId())
                .orElseThrow(() -> new RuntimeException("User not found on server."));

        Product product = productRepository
                .findById(requestDto.productId())
                .orElseThrow(() -> new ResourceNotFoundException("Requested product not found on server."));

        Address address = addressRepository
                .findAddressById(requestDto.addressId())
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
    public void deliverOrder(String id) {
        Order order = orderRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order is not available on server"));

        if (order.isDelivered()) {
            throw new OrderException("Order already delivered");
        }

        order.setDelivered(true);
        orderRepository.save(order);
    }

    @Override
    public void cancelOrder(String id) {
        Order order = orderRepository
                .findById(id)
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
    public List<OrderResponseDto> getAllUserOrder(String userId) {
        User user = new User();
        user.setId(userId);
        List<Order> orders = orderRepository.findAllByUser(user);

        return orders
                .stream()
                .map(this::toOrderResponseDto)
                .toList();
    }

    @Override
    public OrderResponseDto getUserOrderById(String id, String orderId) {
        User user = new User();
        user.setId(id);
        Order order = orderRepository
                .findByIdAndUser(orderId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Requested Order not available"));

        return toOrderResponseDto(order);
    }
}
