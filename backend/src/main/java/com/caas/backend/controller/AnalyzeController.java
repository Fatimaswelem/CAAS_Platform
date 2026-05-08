package com.caas.backend.controller;

import com.caas.backend.dto.AnalysisResponseDTO;
import com.caas.backend.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AnalyzeController {

    @Autowired
    private SubmissionService submissionService;


    @PostMapping("/analyze")
    public ResponseEntity<?> analyze(
            @RequestBody AnalysisRequest request,
            Authentication auth) {


        if (request.sourceCode == null || request.sourceCode.isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("sourceCode must not be null or empty."));
        }


        if (request.sourceCode.length() > 500) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("sourceCode exceeds the 500-character limit."));
        }

        AnalysisResponseDTO response = submissionService.analyze(auth, request.sourceCode);

        return ResponseEntity.ok(response);
    }


    public static class AnalysisRequest {
        public String sourceCode;
    }

    public static class ErrorResponse {
        public String error;
        public ErrorResponse(String error) { this.error = error; }
    }
}
