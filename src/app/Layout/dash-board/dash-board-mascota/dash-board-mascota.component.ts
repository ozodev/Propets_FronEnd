import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/Objects/Mascota';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-dash-board-mascota',
  templateUrl: './dash-board-mascota.component.html',
  styleUrls: ['./dash-board-mascota.component.css']
})
export class DashBoardMascotaComponent implements OnInit {

  public mascotas:Mascota[];
  public newMascota:boolean;

  constructor(private storage:StorageService) {
    this.mascotas = []
    this.onUpdate()
    this.newMascota = false;
  }
  ngOnInit(): void {}

  public onUpdate():void{this.mascotas=this.storage.Mascotas}

  public onUpdateNew():void{
    this.onUpdate()
    this.newMascota=false;
  }
  
}
