package dev.abhisek.server.controllers;

import dev.abhisek.server.dto.AddressRequestDto;
import dev.abhisek.server.dto.UserRequestDto;
import dev.abhisek.server.dto.UserResponseDto;
import dev.abhisek.server.entity.Address;
import dev.abhisek.server.entity.Role;
import dev.abhisek.server.entity.User;
import dev.abhisek.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping("all")
    public ResponseEntity<List<UserResponseDto>> getAllUser() {
        return ResponseEntity
                .ok(userService.getAllUser());
    }

    @GetMapping("{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable String id) {
        return ResponseEntity
                .ok(userService.getUserById(id));
    }

    @GetMapping
    public ResponseEntity<UserResponseDto> getAuthUser(@AuthenticationPrincipal User user) {
        return ResponseEntity
                .ok(userService.getAuthUser(user));
    }

    @PutMapping("{id}")
    public ResponseEntity<UserResponseDto> updateUser(@RequestBody UserRequestDto requestDto, @PathVariable String id) {
        return ResponseEntity
                .accepted()
                .body(userService.updateUserInformationById(requestDto, id));
    }

    @PutMapping
    public ResponseEntity<UserResponseDto> updateAuthUser(@RequestBody UserRequestDto requestDto, @AuthenticationPrincipal User user) {
        return ResponseEntity
                .accepted()
                .body(userService.updateAuthUserInformation(user, requestDto));
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable String id) {
        userService.deleteUserById(id);
        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAuthUser(@AuthenticationPrincipal User user) {
        userService.deleteAuthUser(user);
        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping("{id}/address")
    public ResponseEntity<List<Address>> getAllUserAddress(@PathVariable String id) {
        return ResponseEntity
                .ok(userService.getAllUserAddress(id));
    }

    @GetMapping("address")
    public ResponseEntity<List<Address>> getAuthUserAddress(@AuthenticationPrincipal User user) {
        return ResponseEntity
                .ok(userService.getAllAuthUserAddress(user));
    }

    @GetMapping("address/{addId}")
    public ResponseEntity<Address> getAddressById(@PathVariable Integer addId) {
        return ResponseEntity
                .ok(userService.getAddressById(addId));
    }

    @PostMapping("address")
    public ResponseEntity<UserResponseDto> addUserAddress(@AuthenticationPrincipal User user, @RequestBody AddressRequestDto requestDto) {
        return ResponseEntity
                .accepted()
                .body(userService.addUserAddress(user, requestDto));
    }

    @DeleteMapping("address/{addId}")
    public ResponseEntity<Void> deleteAddressById(@AuthenticationPrincipal User user, @PathVariable Integer addId) {
        if (user.getRole() == Role.ADMIN) {
            userService.deleteAddressById(addId);
        } else {
            userService.deleteUserAddress(user, addId);
        }
        return ResponseEntity
                .noContent()
                .build();
    }
}
