import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ko-modal',
  templateUrl: './ko-modal.component.html',
  styleUrls: ['./ko-modal.component.scss'],
})
export class KoModalComponent implements OnInit {
  @Input() errorToShow: any

  constructor( ) { }

  ngOnInit() {}

}
