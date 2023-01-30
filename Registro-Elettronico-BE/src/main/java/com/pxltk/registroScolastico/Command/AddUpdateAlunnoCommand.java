package com.pxltk.registroScolastico.Command;

import lombok.Data;

@Data
public class AddUpdateAlunnoCommand{
        private Integer matricola;
        private String nome;
        private String cognome;
        private Integer assenze;
}

