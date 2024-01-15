package dev.abhisek.server.services;

import dev.abhisek.server.dto.AddressRequestDto;
import dev.abhisek.server.dto.UserRequestDto;
import dev.abhisek.server.dto.UserResponseDto;
import dev.abhisek.server.entity.Address;
import dev.abhisek.server.entity.User;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface UserService {

    @PreAuthorize("hasAuthority('ADMIN')")
    UserResponseDto getUserById(String id);

    UserResponseDto getAuthUser(User user);

    @PreAuthorize("hasAuthority('ADMIN')")
    UserResponseDto updateUserInformationById(UserRequestDto requestDto, String id);

    UserResponseDto updateAuthUserInformation(User user, UserRequestDto requestDto);

    @PreAuthorize("hasAuthority('ADMIN')")
    void deleteUserById(String id);

    void deleteAuthUser(User user);

    @PreAuthorize("hasAuthority('ADMIN')")
    List<Address> getAllUserAddress(String id);

    List<Address> getAllAuthUserAddress(User user);

    @PreAuthorize("hasAuthority('ADMIN')")
    Address getAddressById(int addId);

    UserResponseDto addUserAddress(User user, AddressRequestDto requestDto);

    @PreAuthorize("hasAuthority('ADMIN')")
    void deleteAddressById(int addId);


    void deleteUserAddress(User user, int addId);

}
