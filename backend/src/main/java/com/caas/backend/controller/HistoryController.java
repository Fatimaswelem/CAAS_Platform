package com.caas.backend.controller;

import com.caas.backend.dto.HistoryItemDTO;
import com.caas.backend.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * HistoryController — Member C (Backend API Dev)
 *
 * Exposes GET /api/history per SRS Module F6.
 * Returns the authenticated user's past submissions, ordered by
 * timestamp descending (F6-01), with a source code preview and
 * full re-renderable results (F6-02, F6-03, F6-04).
 *
 * JWT enforcement: handled automatically by Spring Security / JwtAuthFilter (Member B).
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HistoryController {

    @Autowired
    private SubmissionService submissionService;


    @GetMapping("/history")
    public ResponseEntity<List<HistoryItemDTO>> getHistory(Authentication auth) {
        List<HistoryItemDTO> history = submissionService.getHistory(auth);
        return ResponseEntity.ok(history);
    }
}
