package com.caas.backend.service;

import com.caas.backend.compiler.*;
import com.caas.backend.dto.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class CompilerService {

    public AnalysisResponseDTO analyze(String sourceCode) {
        AnalysisResponseDTO response = new AnalysisResponseDTO();
        response.errors = new ArrayList<>();
        response.timestamp = Instant.now().toString();

        // --- PHASE 1: LEXER ---
        List<Token> tokens;
        try {
            Scanner scanner = new Scanner(sourceCode);
            tokens = scanner.scanTokens();

            response.tokens = new ArrayList<>();
            for (Token token : tokens) {
                if (token.type != TokenType.EOF) {
                    response.tokens.add(new TokenDTO(
                            token.type.toString(),
                            token.lexeme,
                            token.literal,
                            token.line
                    ));
                }
            }
        } catch (RuntimeException e) {
            response.tokens = new ArrayList<>();
            response.errors.add(new ErrorDTO("LEXER", e.getMessage()));
            return response;
        }

        // --- PHASE 2: PARSER ---
        try {
            Parser parser = new Parser(tokens);
            List<Node> astNodes = parser.parse();

            List<AstNodeDTO> astDTOs = AstConverter.convert(astNodes);
            response.ast = astDTOs;
            
        } catch (RuntimeException e) {
            response.tokens = response.tokens != null ? response.tokens : new ArrayList<>();
            response.errors.add(new ErrorDTO("PARSER", e.getMessage()));        }

        return response;
    }


}