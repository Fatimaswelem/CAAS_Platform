package com.caas.backend.controller;

import com.caas.backend.dto.AuthResponseDTO;
import com.caas.backend.dto.RegisterRequestDTO;
import com.caas.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }
}