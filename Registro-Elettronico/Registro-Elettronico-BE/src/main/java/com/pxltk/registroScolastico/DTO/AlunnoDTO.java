package com.pxltk.registroScolastico.DTO;

import com.pxltk.registroScolastico.Model.Alunno;
import com.pxltk.registroScolastico.Model.Voto;

import java.io.Serializable;
import java.util.List;

public record AlunnoDTO(Integer matricola, String nome, String cognome, Integer assenze, List<Integer> voti) implements Serializable {
    public static AlunnoDTO of(Alunno alunno){
        return new AlunnoDTO(alunno.getMatricola(), alunno.getNome(), alunno.getCognome(), alunno.getAssenze(), alunno.getVoti().stream().map(Voto::getVoto).toList());
    }
}
