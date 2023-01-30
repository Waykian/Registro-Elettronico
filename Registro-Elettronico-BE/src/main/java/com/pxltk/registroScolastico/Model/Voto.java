package com.pxltk.registroScolastico.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "voti", schema="demo")
public class Voto {
    @Id
    @Column(name="votoid")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer votoID;

    @Column(name="voto")
    private Integer voto;

    @Column(name="data")
    private Date data;

    @Column(name="materia")
    private String materia;

    @ManyToOne
    @JoinColumn(name="matricola", referencedColumnName = "matricola")
    private Alunno alunno;

    public Voto(Integer voto, String materia, Alunno alunno){
        this.voto = voto;
        this.materia = materia;
        this.alunno = alunno;
    }

    @PrePersist
    public void onCreate(){
        data = new Date();
    }
}
