package com.pxltk.registroScolastico.Command;

import lombok.Data;

@Data
public class AddUpdateVotoCommand {
    private Integer matricola;
    private String materia;
    private Integer voto;
}
