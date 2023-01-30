import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Carica un alunno', url: '/folder/create', icon: 'create'},
    { title: 'Modifica un alunno', url: '/folder/update', icon: 'brush'},
    { title: 'Ricerca un alunno', url: '/folder/get', icon:'finger-print'},
    { title: 'Rimuovi un alunno', url: '/folder/remove', icon: 'trash' },
    { title: 'Inserisci dei voti', url: '/folder/insertVoti', icon: 'enter'}
  ];
  
  constructor() {}
}
