package com.example.Laboratorio.Auth;


import com.example.Laboratorio.dto.LoginRequest;
import com.example.Laboratorio.dto.RegisterRequest;
import com.example.Laboratorio.entity.Role;
import com.example.Laboratorio.entity.User;
import com.example.Laboratorio.jwt.JwtService;
import com.example.Laboratorio.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user=userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();

    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .segundoApellido(request.getSegundoApellido())
                .email(request.getEmail())
                .direccion(request.getDireccion())
                .telefono(request.getTelefono())
                .activo(request.getActivo())
                .username(request.getUsername())
                .password(passwordEncoder.encode( request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();

    }

}