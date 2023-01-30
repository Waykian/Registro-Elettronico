import { Input, Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AddUpdateAlunnoCommand } from './commands/AddUpdateAlunnoCommand';
import { DeleteAlunnoCommand } from './commands/DeleteAlunnoCommand';
import { GetAlunnoCommand } from './commands/GetAlunnoCommand';
import { RegistroService } from './registro.service';
import { NgxSmartModalService } from 'ngx-smart-modal'
import { INgxSmartModalOptions } from 'ngx-smart-modal/src/config/ngx-smart-modal.config';
import { AddUpdateVotoCommand } from './commands/AddUpdateVotoCommand';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public error:any
  public formAlunno:FormGroup
  public formAlunnoEdit:FormGroup
  public formMatricola:FormGroup
  public formVoti:FormGroup
  public showForm:boolean = true;
  private isSubmitted:boolean = false;
  private successInsertVoti:boolean = false;
  private isAlunnoPresent:boolean = false;
  private isFirstVotoPushed:boolean = false;
  alunniCopy!:Array<any>;
  @Input() input!:Array<any>;
  public tempListVoti:Array<AddUpdateVotoCommand> = new Array();
  private optionModal:INgxSmartModalOptions

  constructor(private activatedRoute: ActivatedRoute, private registroService: RegistroService, private ngxSmartModalService: NgxSmartModalService, public formBuilder:FormBuilder, private animationCtrl: AnimationController) {
    this.formAlunno = this.formBuilder.group({
      'nome': ['', [Validators.required, Validators.pattern("[^0-9]+")]],
      'cognome': ['', [Validators.required, Validators.pattern("[^0-9]+")]],
      'assenze': [0, [Validators.required, Validators.pattern("[0-9]+")]]
    });
    this.formAlunnoEdit = this.formBuilder.group({
      'matricola': ['',[Validators.required, Validators.pattern("[0-9]+"), this.matricolaExistValidator()]],
      'nome': [' ', Validators.pattern("[^0-9]+")],
      'cognome': [' ', Validators.pattern("[^0-9]+")],
      'assenze': [0, Validators.pattern("[0-9]+")]
    });
    this.formMatricola = this.formBuilder.group({
      'matricola': ['',[Validators.required, Validators.pattern("[0-9]+"), this.matricolaExistValidator()]]
    });
    this.formVoti = this.formBuilder.group({
      'matricola': ['',[Validators.required, Validators.pattern("[0-9]+"), this.matricolaExistValidator()]],
      'voto':[1,[Validators.required, Validators.pattern("\\b(1[0]|[1-9])\\b")]],
      'materia':['',[Validators.required, Validators.pattern("[^0-9]+")]]
    });

    this.optionModal = {
      customClass: "ngxSmartModal"
    };

  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.isAlunnoPresent = false
    this.isFirstVotoPushed = false
    this.successInsertVoti = false
  }

  ngAfterViewInit(){
    let tempListVoti = []
    this.refreshAlunni()
  }

  loadErrorInModal(){
    this.ngxSmartModalService.setModalData(this.error, 'koModal');
  }

  refreshAlunni(){
    this.registroService.findAll().subscribe((response) => {
      this.input = response
      this.alunniCopy = [...this.input]
     })
  }

  checkFirstVotoPushed(){
    return this.isFirstVotoPushed;
  }

  onSubmitCreate(){
    this.isSubmitted = true;
    if (!this.formAlunno.valid){
      this.error = "Dati non validi nella creazione"
      this.ngxSmartModalService.create("koModal", this.error, this.optionModal)
      this.ngxSmartModalService.getModal("koModal").open()
    }else{
      var command = AddUpdateAlunnoCommand.withoutMatricola(this.fAlunno['nome'].value, this.fAlunno['cognome'].value, this.fAlunno['assenze'].value);
      this.registroService.create(command).subscribe({
        next: () => {this.refreshAlunni()},
        error: (error) =>{this.handleResponseError(error)}
      })
    }
  }

  onSubmitUpdate(){
    this.isSubmitted = true;
    if (!this.formAlunnoEdit.valid){
      this.error = "Dati non validi nella modifica"
      this.ngxSmartModalService.create("koModal", this.error, this.optionModal)
      this.ngxSmartModalService.getModal("koModal").open()
    }else{
      var command = AddUpdateAlunnoCommand.withMatricola(this.fAlunnoEdit['matricola'].value, this.fAlunnoEdit['nome'].value, this.fAlunnoEdit['cognome'].value, this.fAlunnoEdit['assenze'].value);
      this.registroService.update(command).subscribe({
        next: () => {this.refreshAlunni()},
        error: (error) =>{this.handleResponseError(error)}
      })
    }
  }


  /* async onSubmitCreateUpdate() {
    this.isSubmitted = true;

    switch (this.folder){
      case 'create':
        if (!this.formAlunno.valid){
          this.error = "Dati non validi nella creazione"
          this.ngxSmartModalService.create("koModal", this.error, this.optionModal)
          this.ngxSmartModalService.getModal("koModal").open()
          return false;
        }
        var command = AddUpdateAlunnoCommand.withoutMatricola(this.fAlunno['nome'].value, this.fAlunno['cognome'].value, this.fAlunno['assenze'].value);
        this.registroService.create(command).subscribe({
          next: () => {this.refreshAlunni()},
          error: (error) =>{this.handleResponseError(error)}
        })
        
        break;
      case 'update':
        if(!this.formAlunnoEdit.valid) {
          console.log('Dati non validi')
          return false;
        }
        var command = AddUpdateAlunnoCommand.withMatricola(this.fAlunnoEdit['matricola'].value, this.fAlunnoEdit['nome'].value, this.fAlunnoEdit['cognome'].value, this.fAlunnoEdit['assenze'].value);
        try{
          await firstValueFrom(this.registroService.update(command))
        }catch(error){
          this.error = error
          this.ngxSmartModalService.getModal("koModal").open()
          console.error(error)
        }
      
        this.refreshAlunni()
        break;
      }

    return true
  } */

  handleResponseError(error:any){
    console.log(error)
  }


  insertVotoInList() {
    this.successInsertVoti = false
    if(!this.formVoti.valid){
      this.error = "Dati non validi durante l'inserimento di un voto"
      this.ngxSmartModalService.create("koModal", this.error, this.optionModal)
      this.ngxSmartModalService.getModal("koModal").open()
      return false
    }
    this.isFirstVotoPushed = true
    var command = new AddUpdateVotoCommand(this.fVoti['matricola'].value, this.fVoti['materia'].value, this.fVoti['voto'].value)
    console.log(this.tempListVoti.push(command))
    this.formVoti.reset()
    return true
  }

  onSubmitVoti(){
    this.registroService.insertVoti(this.tempListVoti).subscribe({
      next: () => { this.successInsertVoti = true},
      error: (error) =>{this.handleResponseError(error)}
    })
    this.tempListVoti = new Array()
    this.isFirstVotoPushed = false
  }
  
  didInsertVotiSucceed() {
    return this.successInsertVoti
  }

  onSubmitGet(){
    this.isSubmitted = true
    var command = new GetAlunnoCommand(this.fMatricola['matricola'].value);
    this.registroService.get(command).subscribe(
      (alunno) =>{
        this.alunniCopy.splice(0, this.input.length, alunno);
        this.isAlunnoPresent = true
      },
      (error) =>{
        this.alunniCopy = this.input.slice()
        this.isAlunnoPresent = false
      }
    );
  }

  async onSubmitRemove(){
    this.isSubmitted = true
    var command = new DeleteAlunnoCommand(this.fMatricola['matricola'].value);
    await firstValueFrom(this.registroService.remove(command))
    this.refreshAlunni()
  }


  matricolaExistValidator(): ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null => {
      const matricola = control.value
      if (!matricola) {
        return null;
      }
      if(!this.input.find(alunno => alunno.matricola === matricola)){
        return {
          matricola:{
            found: false
          }
        }
      }
      return null
    }
    
  }

  checkSubmit() {
    return this.isSubmitted
  }

  checkAlunnoPresent(){
    return this.isAlunnoPresent
  }

  get fAlunno() {
    return this.formAlunno.controls;
  }

  get fAlunnoEdit() {
    return this.formAlunnoEdit.controls;
  }

  get fMatricola(){
    return this.formMatricola.controls;
  }

  get fVoti(){
    return this.formVoti.controls;
  }

}
