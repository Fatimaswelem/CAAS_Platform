package com.caas.backend.dto;

import java.util.List;


public class HistoryItemDTO {

    public Long submissionId;

    public String submittedAt;

    public String sourceCodePreview;

    public String status;

    public List<TokenDTO> tokens;

    public Object ast;

    public List<ErrorDTO> errors;
}
