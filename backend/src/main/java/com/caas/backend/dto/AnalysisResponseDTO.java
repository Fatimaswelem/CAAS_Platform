package com.caas.backend.dto;

import java.util.List;

public class AnalysisResponseDTO {
    public List<TokenDTO> tokens;
    public Object ast;
    public List<ErrorDTO> errors;
    public String timestamp;
}