package com.caas.backend.dto;

import java.util.List;

public class AnalysisResponseDTO {
    public Long submissionId;
    public List<TokenDTO> tokens;
    public List<AstNodeDTO> ast;
    public List<ErrorDTO> errors;
    public String timestamp;
}