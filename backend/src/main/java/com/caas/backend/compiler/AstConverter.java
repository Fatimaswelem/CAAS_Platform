package com.caas.backend.compiler;

import com.caas.backend.dto.AstNodeDTO;
import java.util.ArrayList;
import java.util.List;

public class AstConverter {

    public static List<AstNodeDTO> convert(List<Node> nodes) {
        List<AstNodeDTO> result = new ArrayList<>();
        for (Node node : nodes) {
            result.add(convertNode(node));
        }
        return result;
    }

    private static AstNodeDTO convertNode(Node node) {
        AstNodeDTO dto = new AstNodeDTO();

        if (node instanceof LiteralNode) {
            dto.type = "LiteralNode";
            dto.value = ((LiteralNode) node).value;
        }
        else if (node instanceof IdNode) {
            dto.type = "IdNode";
            dto.name = ((IdNode) node).name;
        }
        else if (node instanceof ApplicationNode) {
            ApplicationNode app = (ApplicationNode) node;
            dto.type = "ApplicationNode";
            dto.operator = app.operator;
            dto.arguments = new ArrayList<>();
            for (Node arg : app.arguments) {
                dto.arguments.add(convertNode(arg));
            }
        }
        else if (node instanceof LetNode) {
            LetNode let = (LetNode) node;
            dto.type = "LetNode";
            dto.id = let.id;
            dto.boundValue = convertNode(let.value);
        }

        return dto;
    }
}