package com.caas.backend;

import com.caas.backend.service.CompilerService;
import com.caas.backend.dto.AnalysisResponseDTO;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CompilerTests {

    private final CompilerService compilerService = new CompilerService();

    // --- 10 VALID TEST CASES (Expect 0 Errors) ---
    @Test void testValid1() { checkValid("(+ 1 2)"); }
    @Test void testValid2() { checkValid("(* 10 5)"); }
    @Test void testValid3() { checkValid("(- 100 50)"); }
    @Test void testValid4() { checkValid("(/ 10 2)"); }
    @Test void testValid5() { checkValid("(> 5 3)"); }
    @Test void testValid6() { checkValid("(= 10 10)"); }
    @Test void testValid7() { checkValid("(and true false)"); }
    @Test void testValid8() { checkValid("(+ 1 (+ 2 3))"); }
    @Test void testValid9() { checkValid("(let x 5)"); }
    @Test void testValid10() { checkValid("(+(85) (35))"); }

    // --- 5 INVALID TEST CASES (Updated for "Guaranteed" Errors) ---
    @Test void testInvalid1() { checkInvalid("("); }             // Incomplete expression
    @Test void testInvalid2() { checkInvalid("+ 1 2"); }         // Missing opening parenthesis
    @Test void testInvalid3() { checkInvalid("(+ 1 2 @)"); }     // Invalid symbol @ 
    @Test void testInvalid4() { checkInvalid("(+ 1 2) )"); }        // Missing arguments
    @Test void testInvalid5() { checkInvalid("(+(85) (35)"); }   // Missing final parenthesis

    // Helper to keep the code clean
    private void checkValid(String code) {
        AnalysisResponseDTO response = compilerService.analyze(code);
        assertTrue(response.errors.isEmpty(), "Should have no errors for: " + code);
        assertNotNull(response.tokens);
    }

    private void checkInvalid(String code) {
        AnalysisResponseDTO response = compilerService.analyze(code);
        assertFalse(response.errors.isEmpty(), "Should have errors for: " + code);
    }
}