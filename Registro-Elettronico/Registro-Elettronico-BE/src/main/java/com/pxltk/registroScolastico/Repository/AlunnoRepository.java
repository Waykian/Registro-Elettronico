package com.pxltk.registroScolastico.Repository;

import com.pxltk.registroScolastico.Model.Alunno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlunnoRepository extends JpaRepository<Alunno, Integer> {
    Optional<Alunno> findByMatricola(Integer matricola);

}
