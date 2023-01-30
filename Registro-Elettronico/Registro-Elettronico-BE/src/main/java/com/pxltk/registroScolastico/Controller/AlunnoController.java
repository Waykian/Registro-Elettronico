package com.pxltk.registroScolastico.Controller;

import com.pxltk.registroScolastico.Command.AddUpdateAlunnoCommand;
import com.pxltk.registroScolastico.Command.AddUpdateVotoCommand;
import com.pxltk.registroScolastico.Command.DeleteAlunnoCommand;
import com.pxltk.registroScolastico.Command.GetAlunnoCommand;
import com.pxltk.registroScolastico.DTO.AlunnoDTO;
import com.pxltk.registroScolastico.Exception.RegistroException;
import com.pxltk.registroScolastico.Service.Interfaces.IAlunnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/alunni")
public class AlunnoController {

    private final IAlunnoService alunnoService;

    @Autowired
    public AlunnoController(IAlunnoService alunnoService){
        this.alunnoService = alunnoService;
    }

    @PostMapping("/create")
    public ResponseEntity<Boolean> create(@RequestBody AddUpdateAlunnoCommand command){
        try{
            return ResponseEntity.ok(alunnoService.create(command));
        }catch(RegistroException e){
            return new ResponseEntity<>(e.getStatus());
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Boolean> update(@RequestBody AddUpdateAlunnoCommand command){
        try{
            return ResponseEntity.ok(alunnoService.update(command));
        }catch(RegistroException e){
            return new ResponseEntity<>(e.getStatus());
        }
    }

    @PostMapping("/get")
    public ResponseEntity<AlunnoDTO> get(@RequestBody GetAlunnoCommand command){
        try{
            return ResponseEntity.ok(alunnoService.get(command));
        }catch(RegistroException e){
            return new ResponseEntity<>(e.getStatus());
        }
    }

    @PostMapping("/remove")
    public ResponseEntity<Boolean> remove(@RequestBody DeleteAlunnoCommand command){
        try{
            return ResponseEntity.ok(alunnoService.remove(command));
        }catch(RegistroException e){
            return new ResponseEntity<>(e.getStatus());
        }
    }

    @PostMapping("/insertVoti")
    public ResponseEntity<Boolean> insertVoti(@RequestBody List<AddUpdateVotoCommand> command){
        try{
            return ResponseEntity.ok(alunnoService.insertVoti(command));
        }catch(RegistroException e){
            return new ResponseEntity<>(e.getStatus());
        }
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<AlunnoDTO>> findAll(){
        try{
            return ResponseEntity.ok(alunnoService.findAll());
        }catch(RegistroException e){
            return new ResponseEntity<>(e.getStatus());
        }
    }
}
