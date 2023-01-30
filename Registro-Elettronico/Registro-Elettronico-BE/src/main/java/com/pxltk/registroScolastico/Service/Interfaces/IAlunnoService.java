package com.pxltk.registroScolastico.Service.Interfaces;

import com.pxltk.registroScolastico.Command.AddUpdateAlunnoCommand;
import com.pxltk.registroScolastico.Command.AddUpdateVotoCommand;
import com.pxltk.registroScolastico.Command.DeleteAlunnoCommand;
import com.pxltk.registroScolastico.Command.GetAlunnoCommand;
import com.pxltk.registroScolastico.DTO.AlunnoDTO;
import java.util.List;

public interface IAlunnoService {
    boolean create(AddUpdateAlunnoCommand command);
    boolean update(AddUpdateAlunnoCommand command);
    boolean remove(DeleteAlunnoCommand command);
    AlunnoDTO get(GetAlunnoCommand command);
    boolean insertVoti(List<AddUpdateVotoCommand> command);
    List<AlunnoDTO> findAll();
}
