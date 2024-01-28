package dev.abhisek.server.controllers;

import dev.abhisek.server.dto.OrderResponseDto;
import dev.abhisek.server.dto.ProductResponseDto;
import dev.abhisek.server.dto.UserRequestDto;
import dev.abhisek.server.dto.UserResponseDto;
import dev.abhisek.server.entity.Address;
import dev.abhisek.server.services.OrderService;
import dev.abhisek.server.services.ProductService;
import dev.abhisek.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final OrderService orderService;
    private final UserService userService;
    private final ProductService productService;

    //    ORDER CONTROLLERS
    @GetMapping("orders/all")
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrder());
    }

    @GetMapping("orders/user/{id}")
    public ResponseEntity<List<OrderResponseDto>> getAllUserOrder(@PathVariable String id) {
        return ResponseEntity.ok(orderService.getAllUserOrderById(id));
    }

    @GetMapping("orders/{orderId}")
    public ResponseEntity<OrderResponseDto> getOrderById(@PathVariable String orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    //    USER CONTROLLERS
    @GetMapping("users/all")
    public ResponseEntity<List<UserResponseDto>> getAllUser() {
        return ResponseEntity
                .ok(userService.getAllUser());
    }

    @GetMapping("users/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable String id) {
        return ResponseEntity
                .ok(userService.getUserById(id));
    }

    @PutMapping("users/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@RequestBody UserRequestDto requestDto, @PathVariable String id) {
        return ResponseEntity
                .accepted()
                .body(userService.updateUserInformationById(requestDto, id));
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable String id) {
        userService.deleteUserById(id);
        return ResponseEntity
                .noContent()
                .build();
    }

    //    ADDRESS CONTROLLERS
    @GetMapping("users/{id}/address")
    public ResponseEntity<List<Address>> getAllUserAddress(@PathVariable String id) {
        return ResponseEntity
                .ok(userService.getAllUserAddress(id));
    }

    @GetMapping("address/{addId}")
    public ResponseEntity<Address> getAddressById(@PathVariable Integer addId) {
        return ResponseEntity
                .ok(userService.getAddressById(addId));
    }

    @DeleteMapping("address/{addId}")
    public ResponseEntity<Void> deleteAddressById(@PathVariable Integer addId) {
        userService.deleteAddressById(addId);
        return ResponseEntity
                .noContent()
                .build();
    }

    //    PRODUCT CONTROLLERS
    @GetMapping("products/search")
    public ResponseEntity<List<ProductResponseDto>> advanceSearchProduct(@RequestParam String query, @RequestParam String searchBy) {
        return ResponseEntity.ok(productService.advanceProductSearch(query, searchBy));
    }
}
