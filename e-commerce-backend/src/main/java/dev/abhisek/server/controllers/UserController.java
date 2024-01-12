package dev.abhisek.server.controllers;

import dev.abhisek.server.dto.AddressRequestDto;
import dev.abhisek.server.dto.UserRequestDto;
import dev.abhisek.server.dto.UserResponseDto;
import dev.abhisek.server.entity.Address;
import dev.abhisek.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserRequestDto requestDto) {
        return ResponseEntity
                .accepted()
                .body(userService.createUser(requestDto));
    }

    @GetMapping("{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable String id) {
        return ResponseEntity
                .ok(userService.getUserById(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<UserResponseDto> updateUser(@RequestBody UserRequestDto requestDto, @PathVariable String id) {
        return ResponseEntity
                .accepted()
                .body(userService.updateUserInformation(requestDto, id));
    }

//    TODO : Delete a user

    @GetMapping("{id}/address")
    public ResponseEntity<List<Address>> getAllUserAddress(@PathVariable String id) {
        return ResponseEntity
                .ok(userService.getAllUserAddress(id));
    }

    @GetMapping("{id}/address/{addId}")
    public ResponseEntity<Address> getUserAddressById(@PathVariable String id, @PathVariable Integer addId) {
        return ResponseEntity
                .ok(userService.getUserAddressById(id, addId));
    }

    @PostMapping("{id}/address")
    public ResponseEntity<UserResponseDto> addUserAddress(@PathVariable String id, @RequestBody AddressRequestDto requestDto) {
        return ResponseEntity
                .accepted()
                .body(userService.addUserAddress(id, requestDto));
    }

    @DeleteMapping("{id}/address/{addId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable String id, @PathVariable Integer addId) {
        userService.deleteUserAddress(id, addId);
        return ResponseEntity
                .noContent()
                .build();
    }
}
