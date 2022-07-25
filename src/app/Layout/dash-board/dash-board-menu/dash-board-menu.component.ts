import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dash-board-menu',
  templateUrl: './dash-board-menu.component.html',
  styleUrls: ['./dash-board-menu.component.css']
})
export class DashBoardMenuComponent implements OnInit {

  @Output() seccionEvent= new EventEmitter()
  @Input() seccion='inicio'

  constructor() { }

  ngOnInit(): void {}

  public sendSeccion(seccion:string):void{this.seccionEvent.emit(seccion)}

}
