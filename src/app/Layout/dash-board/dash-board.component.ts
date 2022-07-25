import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  constructor() {}

  public showPersonal = true
  public showMascotas = true
  public showCitas = true;
  public seccion:string = 'inicio'

  ngOnInit(): void {}

  public changeSeccion(seccion:string):void{
    this.seccion=seccion
    switch(seccion){
      case 'mascotas':
        this.showPersonal=false;
        this.showMascotas=true;
        this.showCitas = false;
        break;
      case 'citas':
        this.showPersonal=false;
        this.showMascotas=false;
        this.showCitas=true;
        break;
      default:
        this.showPersonal=true;
        this.showMascotas=true;
        this.showCitas=true
        break;
    }
  }
}