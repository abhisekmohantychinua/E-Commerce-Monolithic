package dev.abhisek.server.controllers;

import dev.abhisek.server.dto.AddressRequestDto;
import dev.abhisek.server.dto.UserRequestDto;
import dev.abhisek.server.dto.UserResponseDto;
import dev.abhisek.server.entity.Address;
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


    @GetMapping
    public ResponseEntity<UserResponseDto> getAuthUser(@AuthenticationPrincipal User user) {
        return ResponseEntity
                .ok(userService.getAuthUser(user));
    }


    @PutMapping
    public ResponseEntity<UserResponseDto> updateAuthUser(@RequestBody UserRequestDto requestDto, @AuthenticationPrincipal User user) {
        return ResponseEntity
                .accepted()
                .body(userService.updateAuthUserInformation(user, requestDto));
    }


    @DeleteMapping
    public ResponseEntity<Void> deleteAuthUser(@AuthenticationPrincipal User user) {
        userService.deleteAuthUser(user);
        return ResponseEntity
                .noContent()
                .build();
    }


    @GetMapping("address")
    public ResponseEntity<List<Address>> getAuthUserAddress(@AuthenticationPrincipal User user) {
        return ResponseEntity
                .ok(userService.getAllAuthUserAddress(user));
    }


    @PostMapping("address")
    public ResponseEntity<UserResponseDto> addUserAddress(@AuthenticationPrincipal User user, @RequestBody AddressRequestDto requestDto) {
        return ResponseEntity
                .accepted()
                .body(userService.addUserAddress(user, requestDto));
    }


    @DeleteMapping("address/{addId}")
    public ResponseEntity<Void> deleteAddressById(@AuthenticationPrincipal User user, @PathVariable Integer addId) {

        userService.deleteUserAddress(user, addId);
        return ResponseEntity
                .noContent()
                .build();
    }
}
