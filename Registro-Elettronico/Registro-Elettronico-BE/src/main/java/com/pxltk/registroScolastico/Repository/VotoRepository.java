package com.pxltk.registroScolastico.Repository;

import com.pxltk.registroScolastico.Model.Voto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VotoRepository extends JpaRepository<Voto, Integer> {

}
