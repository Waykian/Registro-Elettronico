export class AddUpdateAlunnoCommand{
  private matricola: number = 0
  private nome: string = ''
  private cognome: string = ''
  private assenze: number = 0

  public static withMatricola(matricola: number, nome: string, cognome: string, assenze: number){
    const command = new AddUpdateAlunnoCommand();
    command.matricola = matricola
    command.nome = nome
    command.cognome = cognome
    command.assenze = assenze
    return command
  }
  
  public static withoutMatricola(nome: string, cognome: string, assenze: number){
    const command = new AddUpdateAlunnoCommand();
    command.nome = nome
    command.cognome = cognome
    command.assenze = assenze
    return command
  }
}