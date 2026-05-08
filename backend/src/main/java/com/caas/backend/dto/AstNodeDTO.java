package com.caas.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.util.List;

@JsonInclude(Include.NON_NULL)
public class AstNodeDTO {
    public String type;

    // For LiteralNode only
    public Object value;

    // For IdNode only
    public String name;

    // For ApplicationNode only
    public String operator;
    public List<AstNodeDTO> arguments;

    // For LetNode only
    public String id;
    public AstNodeDTO boundValue;  // Use different name to avoid conflict

    public AstNodeDTO() {}
}