package com.pxltk.registroScolastico.Exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

import java.io.Serial;

@Data
@EqualsAndHashCode(callSuper = false)
public class RegistroException extends RuntimeException{
    @Serial
    private static final long serialVersionUID = 1L;
    private final HttpStatus status;

    public RegistroException(HttpStatus status){
        this.status = status;
    }
}
