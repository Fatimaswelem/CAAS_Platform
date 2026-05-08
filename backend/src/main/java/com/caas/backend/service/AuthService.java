package com.caas.backend.service;

import com.caas.backend.dto.AuthResponseDTO;
import com.caas.backend.dto.RegisterRequestDTO;
import com.caas.backend.entity.User;
import com.caas.backend.repository.UserRepository;
import com.caas.backend.security.JwtService;
import com.caas.backend.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponseDTO register(RegisterRequestDTO request) {
        String emailHash = UserDetailsServiceImpl.hashEmail(request.email);

        if (userRepository.findByEmailHash(emailHash).isPresent()) {
            throw new RuntimeException("Email already registered.");
        }

        User user = new User();
        user.setEmailHash(emailHash);
        user.setPasswordHash(passwordEncoder.encode(request.password));
        user.setRole(User.Role.student);

        userRepository.save(user);

        String token = jwtService.generateToken(request.email);
        return new AuthResponseDTO(token);
    }

    public AuthResponseDTO login(RegisterRequestDTO request) {
      try{  authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email, request.password)
        );
        String token = jwtService.generateToken(request.email);
        return new AuthResponseDTO(token);
    }catch(
    BadCredentialsException e) {
        throw new BadCredentialsException("Invaild Email or password.");
    }
    }
}