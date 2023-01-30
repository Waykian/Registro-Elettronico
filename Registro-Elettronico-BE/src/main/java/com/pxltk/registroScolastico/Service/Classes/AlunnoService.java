package com.pxltk.registroScolastico.Service.Classes;

import com.pxltk.registroScolastico.Command.AddUpdateAlunnoCommand;
import com.pxltk.registroScolastico.Command.AddUpdateVotoCommand;
import com.pxltk.registroScolastico.Command.DeleteAlunnoCommand;
import com.pxltk.registroScolastico.Command.GetAlunnoCommand;
import com.pxltk.registroScolastico.DTO.AlunnoDTO;
import com.pxltk.registroScolastico.Exception.RegistroException;
import com.pxltk.registroScolastico.Model.Alunno;
import com.pxltk.registroScolastico.Model.Voto;
import com.pxltk.registroScolastico.Repository.AlunnoRepository;
import com.pxltk.registroScolastico.Repository.VotoRepository;
import com.pxltk.registroScolastico.Service.Interfaces.IAlunnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlunnoService implements IAlunnoService {

    private final AlunnoRepository alunnoRepository;
    private final VotoRepository votoRepository;

    @Autowired
    public AlunnoService(AlunnoRepository alunnoRepository, VotoRepository votoRepository) {
        this.alunnoRepository = alunnoRepository;
        this.votoRepository = votoRepository;
    }

    @Override
    public boolean create(AddUpdateAlunnoCommand command) throws RegistroException {
        return addUpdate(new Alunno(),command);
    }

    @Override
    public boolean update(AddUpdateAlunnoCommand command) throws RegistroException{
        Optional<Alunno> alunno = this.alunnoRepository.findByMatricola(command.getMatricola());
        if(alunno.isEmpty()){
            throw new RegistroException(HttpStatus.NOT_FOUND);
        }
        return alunno.filter(value -> addUpdate(value, command)).isPresent();

    }

    private boolean addUpdate(Alunno alunno, AddUpdateAlunnoCommand command){
        if(command.getNome() != null && !command.getNome().isBlank()){
            alunno.setNome(command.getNome());
        }
        if(command.getCognome() != null && !command.getCognome().isBlank()){
            alunno.setCognome(command.getCognome());
        }
        if(command.getAssenze() != null){
            alunno.setAssenze(command.getAssenze());
        }

        try{
            this.alunnoRepository.save(alunno);
        }catch(Exception e){
            throw new RegistroException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return true;
    }

    @Override
    public boolean remove(DeleteAlunnoCommand command) {
        try{
            Optional<Alunno> alunno = this.alunnoRepository.findByMatricola(command.getMatricola());
            if(alunno.isEmpty()){
                throw new RegistroException(HttpStatus.NOT_FOUND);
            }
            this.alunnoRepository.delete(alunno.get());
            return true;
        }catch(Exception e){
            throw new RegistroException(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public AlunnoDTO get(GetAlunnoCommand command) {
        return AlunnoDTO.of(this.alunnoRepository.findByMatricola(command.getMatricola())
                .orElseThrow(()->new RegistroException(HttpStatus.NOT_FOUND)));
    }

    @Override
    public boolean insertVoti(List<AddUpdateVotoCommand> command){
        Optional<Alunno> alunno;
        Alunno alunnoGet;

        try{
            for(AddUpdateVotoCommand com : command){
                alunno = this.alunnoRepository.findByMatricola(com.getMatricola());
                if(alunno.isPresent()){
                    alunnoGet=alunno.get();
                    Voto voto = new Voto(com.getVoto(),com.getMateria(),alunnoGet);
                    this.votoRepository.save(voto);
                }
            }
        }catch(Exception e){
            return false;
        }
        return true;
    }


    @Override
    public List<AlunnoDTO> findAll(){
        return this.alunnoRepository.findAll().stream().map(AlunnoDTO::of).toList();
    }

}
