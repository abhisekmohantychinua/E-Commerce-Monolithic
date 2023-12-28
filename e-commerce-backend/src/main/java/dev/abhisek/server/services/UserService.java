package dev.abhisek.server.services;

import dev.abhisek.server.dto.AddressRequestDto;
import dev.abhisek.server.dto.UserRequestDto;
import dev.abhisek.server.dto.UserResponseDto;
import dev.abhisek.server.entity.Address;

import java.util.List;

public interface UserService {
    UserResponseDto createUser(UserRequestDto requestDto);

    UserResponseDto getUserById(String id);

    UserResponseDto updateUserInformation(UserRequestDto requestDto, String id);
    
//    TODO: Implement delete user by id.
//    void deleteUserById(String id);

    List<Address> getAllUserAddress(String id);

    Address getUserAddressById(String id, int addId);

    UserResponseDto addUserAddress(String id, AddressRequestDto requestDto);

    void deleteUserAddress(String id, int addId);

}
