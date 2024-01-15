package dev.abhisek.server.services.impl;

import dev.abhisek.server.dto.AuthRequest;
import dev.abhisek.server.dto.AuthResponse;
import dev.abhisek.server.dto.UserRequestDto;
import dev.abhisek.server.dto.UserResponseDto;
import dev.abhisek.server.entity.Role;
import dev.abhisek.server.entity.User;
import dev.abhisek.server.repository.UserRepository;
import dev.abhisek.server.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public UserResponseDto addUser(UserRequestDto requestDto) {
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setName(requestDto.name());
        user.setEmail(requestDto.email());
        user.setUsername(requestDto.username());
        user.setPassword(passwordEncoder.encode(requestDto.password()));
        user.setPhone(requestDto.phone());
        user.setRole(Role.valueOf(requestDto.role()));
        userRepository.save(user);
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
    public AuthResponse loginUser(AuthRequest authRequest) {
        User user = userRepository
                .findByUsernameAndPassword(authRequest.username(), passwordEncoder.encode(authRequest.password()))
                .orElseThrow(() -> new UsernameNotFoundException("No User found with the username and password!!!"));

        return new AuthResponse(jwtService.generateToken(user));
    }

    @Override
    public boolean verifyUsername(String username) {
        return userRepository.findByUsername(username).isEmpty();
    }


}
