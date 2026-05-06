package com.caas.backend.dto;

public class ErrorDTO {
    public String phase;
    public String message;

    public ErrorDTO(String phase, String message) {
        this.phase = phase;
        this.message = message;
    }
}