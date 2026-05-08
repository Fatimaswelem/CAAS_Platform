package com.caas.backend.service;

import com.caas.backend.dto.*;
import com.caas.backend.entity.Result;
import com.caas.backend.entity.Submission;
import com.caas.backend.entity.User;
import com.caas.backend.repository.ResultRepository;
import com.caas.backend.repository.SubmissionRepository;
import com.caas.backend.repository.UserRepository;
import com.caas.backend.security.UserDetailsServiceImpl;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
public class SubmissionService {

    @Autowired
    private CompilerService compilerService;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private UserRepository userRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();



    @Transactional
    public AnalysisResponseDTO analyze(Authentication auth, String sourceCode) {

        User user = resolveUser(auth);

        Submission submission = new Submission();
        submission.setUser(user);
        submission.setSourceCode(sourceCode);
        submission = submissionRepository.save(submission);

        AnalysisResponseDTO response = compilerService.analyze(sourceCode);
        response.submissionId = submission.getId();

        Result.Status status = determineStatus(response);

        Result result = new Result();
        result.setSubmission(submission);
        result.setStatus(status);

        try {
            if (response.tokens != null && !response.tokens.isEmpty()) {
                result.setTokenList(objectMapper.writeValueAsString(response.tokens));
            }
            if (response.ast != null) {
                result.setAstOutput(objectMapper.writeValueAsString(response.ast));
            }
            if (response.errors != null && !response.errors.isEmpty()) {
                result.setErrorMessage(objectMapper.writeValueAsString(response.errors));
            }
        } catch (Exception e) {
            System.err.println("[SubmissionService] JSON serialization warning: " + e.getMessage());
        }

        resultRepository.save(result);

        return response;
    }


    @Transactional(readOnly = true)
    public List<HistoryItemDTO> getHistory(Authentication auth) {

        User user = resolveUser(auth);

        List<Submission> submissions =
                submissionRepository.findByUserIdOrderBySubmittedAtDesc(user.getId());

        List<HistoryItemDTO> history = new ArrayList<>();

        for (Submission sub : submissions) {
            HistoryItemDTO item = new HistoryItemDTO();
            item.submissionId = sub.getId();
            item.submittedAt  = sub.getSubmittedAt().toString();

            String src = sub.getSourceCode();
            item.sourceCodePreview = src.length() > 80 ? src.substring(0, 80) + "..." : src;

            Result result = sub.getResult();
            if (result != null) {
                item.status = result.getStatus().name();
                item.tokens = deserializeTokens(result.getTokenList());
                item.ast    = deserializeObject(result.getAstOutput());
                item.errors = deserializeErrors(result.getErrorMessage());
            } else {
                item.status = "unknown";
            }

            history.add(item);
        }

        return history;
    }



    private User resolveUser(Authentication auth) {
        String email = auth.getName();
        String emailHash = UserDetailsServiceImpl.hashEmail(email);
        return userRepository.findByEmailHash(emailHash)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found in database."));
    }

    private Result.Status determineStatus(AnalysisResponseDTO response) {
        if (response.errors == null || response.errors.isEmpty()) {
            return Result.Status.success;
        }
        boolean isLexerError = response.errors.stream()
                .anyMatch(e -> "LEXER".equalsIgnoreCase(e.phase));
        return isLexerError ? Result.Status.lexer_error : Result.Status.parser_error;
    }

    private List<TokenDTO> deserializeTokens(String json) {
        if (json == null || json.isBlank()) return null;
        try {
            return objectMapper.readValue(json, new TypeReference<List<TokenDTO>>() {});
        } catch (Exception e) {
            return null;
        }
    }

    private Object deserializeObject(String json) {
        if (json == null || json.isBlank()) return null;
        try {
            return objectMapper.readValue(json, Object.class);
        } catch (Exception e) {
            return null;
        }
    }

    private List<ErrorDTO> deserializeErrors(String json) {
        if (json == null || json.isBlank()) return null;
        try {
            return objectMapper.readValue(json, new TypeReference<List<ErrorDTO>>() {});
        } catch (Exception e) {
            return null;
        }
    }
}
