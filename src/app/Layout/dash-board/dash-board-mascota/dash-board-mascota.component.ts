import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/Objects/Mascota';
import { StorageService } from 'src/app/Services/storage/storage.service';

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
    this.mascotas=this.storage.Mascotas
    this.newMascota = false;
  }
  ngOnInit(): void {
    this.storage.getMascotas().subscribe((mascotas)=>{this.mascotas=mascotas})
  }
  
}
