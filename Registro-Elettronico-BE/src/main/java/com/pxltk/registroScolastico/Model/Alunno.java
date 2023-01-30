package com.pxltk.registroScolastico.Model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "alunni", schema="demo")
public class Alunno {
    @Id
    @Column(name = "matricola")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer matricola;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cognome")
    private String cognome;

    @Column(name = "assenze")
    private Integer assenze;

    @OneToMany(mappedBy = "alunno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Voto> voti = new ArrayList<>();

}
