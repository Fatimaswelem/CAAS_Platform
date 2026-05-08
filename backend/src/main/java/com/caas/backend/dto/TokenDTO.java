package com.caas.backend.dto;

import lombok.NoArgsConstructor;


@NoArgsConstructor
public class TokenDTO {
    public String type;
    public String lexeme;
    public Object literal;
    public int line;

    public TokenDTO(String type, String lexeme, Object literal, int line) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }
}