package dev.abhisek.server.services.impl;

import dev.abhisek.server.dto.AddressRequestDto;
import dev.abhisek.server.dto.UserRequestDto;
import dev.abhisek.server.dto.UserResponseDto;
import dev.abhisek.server.entity.Address;
import dev.abhisek.server.entity.Role;
import dev.abhisek.server.entity.User;
import dev.abhisek.server.exceptions.ResourceNotFoundException;
import dev.abhisek.server.repository.AddressRepository;
import dev.abhisek.server.repository.UserRepository;
import dev.abhisek.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    private UserResponseDto userToDto(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getUsername(),
                user.getPassword(),
                user.getPhone(),
                user.getRole().toString(),
                user.getAddresses()
        );
    }


    @Override
    public List<UserResponseDto> getAllUser() {
        return userRepository
                .findAll()
                .stream().map(this::userToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDto getUserById(String id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User Not found"));
        return userToDto(user);
    }

    @Override
    public UserResponseDto getAuthUser(User user) {
        return userToDto(user);
    }

    @Override
    public UserResponseDto updateUserInformationById(UserRequestDto requestDto, String id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User Not found"));
        user.setName(requestDto.name());
        user.setEmail(requestDto.email());
        user.setPassword(requestDto.password());
        user.setPhone(requestDto.phone());
        user.setRole(Role.valueOf(requestDto.role()));
        userRepository.save(user);
        return userToDto(user);
    }

    @Override
    public UserResponseDto updateAuthUserInformation(User user, UserRequestDto requestDto) {
        return updateUserInformationById(requestDto, user.getId());
    }

    @Override
    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public void deleteAuthUser(User user) {
        deleteUserById(user.getId());
    }

    @Override
    public List<Address> getAllUserAddress(String id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User Not found"));
        return user.getAddresses();
    }

    @Override
    public List<Address> getAllAuthUserAddress(User user) {
        return user.getAddresses();
    }

    @Override
    public Address getAddressById(int addId) {
        return addressRepository
                .findById(addId)
                .orElseThrow(() -> new ResourceNotFoundException("Requested address not found on server!!!"));
    }


    @Override
    public UserResponseDto addUserAddress(User user, AddressRequestDto requestDto) {
        Address address = new Address();
        address.setAddress(requestDto.address());
        address.setCity(requestDto.city());
        address.setZip(requestDto.zip());
        address.setPhone(requestDto.phone());

        address = addressRepository.save(address);

        List<Address> addresses = user.getAddresses();
        addresses.add(address);

        user.setAddresses(addresses);
        userRepository.save(user);

        return userToDto(user);
    }

    @Override
    public void deleteAddressById(int addId) {
        addressRepository.deleteById(addId);
    }

    @Override
    public void deleteUserAddress(User user, int addId) {
        user.setAddresses(user
                .getAddresses()
                .stream().filter(address -> address.getId() != addId)
                .collect(Collectors.toList())
        );

        userRepository.save(user);
    }


}
