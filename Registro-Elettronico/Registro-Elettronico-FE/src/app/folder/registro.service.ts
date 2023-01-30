import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddUpdateAlunnoCommand } from './commands/AddUpdateAlunnoCommand';
import { AddUpdateVotoCommand } from './commands/AddUpdateVotoCommand';
import { GetAlunnoCommand } from './commands/GetAlunnoCommand';
import { DeleteAlunnoCommand } from './commands/DeleteAlunnoCommand';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private static BASEPATH = "http://localhost:8080/alunni";
  private static CREATE = "/create"
  private static UPDATE = "/update"
  private static GET = "/get"
  private static REMOVE = "/remove"
  private static INSERTVOTI = "/insertVoti"
  private static FINDALL = "/findAll"

  constructor(private http: HttpClient) { }

  create(command:AddUpdateAlunnoCommand){
    return this.http.post<any>(RegistroService.BASEPATH + RegistroService.CREATE, command)
  }

  update(command:AddUpdateAlunnoCommand){
    return this.http.post<any>(RegistroService.BASEPATH + RegistroService.UPDATE, command)
  }

  get(command:GetAlunnoCommand){
    return this.http.post<any>(RegistroService.BASEPATH + RegistroService.GET, command)
  }

  remove(command:DeleteAlunnoCommand){
    return this.http.post<any>(RegistroService.BASEPATH + RegistroService.REMOVE, command)
  }

  insertVoti(command:Array<AddUpdateVotoCommand>){
    debugger
    return this.http.post<any>(RegistroService.BASEPATH + RegistroService.INSERTVOTI, command)
  }

  findAll(){
    return this.http.get<any>(RegistroService.BASEPATH + RegistroService.FINDALL)
  }

}
