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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    public UserServiceImpl(UserRepository userRepository, AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    private UserResponseDto userToDto(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getPhone(),
                user.getRole().toString(),
                user.getAddresses()
        );
    }

    @Override
    public UserResponseDto createUser(UserRequestDto requestDto) {
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setName(requestDto.name());
        user.setEmail(requestDto.email());
        user.setPassword(requestDto.password());
        user.setPhone(requestDto.phone());
        user.setRole(Role.valueOf(requestDto.role()));
        userRepository.save(user);

        return userToDto(user);
    }

    @Override
    public UserResponseDto getUserById(String id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User Not found"));
        return userToDto(user);
    }

    @Override
    public UserResponseDto updateUserInformation(UserRequestDto requestDto, String id) {
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
    public List<Address> getAllUserAddress(String id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User Not found"));
        return user.getAddresses();
    }

    @Override
    public Address getUserAddressById(String id, int addId) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User Not found"));
        return user
                .getAddresses()
                .stream().filter((a) -> a.getId() == addId)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Requested Address Not Found On Server."));
    }

    @Override
    public UserResponseDto addUserAddress(String id, AddressRequestDto requestDto) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User Not found"));

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
    public void deleteUserAddress(String id, int addId) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User Not found"));
        user.setAddresses(user
                .getAddresses()
                .stream().filter(address -> address.getId() != addId)
                .collect(Collectors.toList())
        );

        userRepository.save(user);
        addressRepository.deleteById(addId);

    }


}
