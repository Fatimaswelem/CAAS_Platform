package com.caas.backend.controller;

import com.caas.backend.dto.AnalysisResponseDTO;
import com.caas.backend.service.CompilerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AnalyzeController {

    @Autowired
    private CompilerService compilerService;

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponseDTO> analyze(@RequestBody AnalysisRequestDTO request) {
        if (request.sourceCode == null || request.sourceCode.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        AnalysisResponseDTO response = compilerService.analyze(request.sourceCode);
        return ResponseEntity.ok(response);
    }

    public static class AnalysisRequestDTO {
        public String sourceCode;
    }
}