import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MascotasService } from 'src/app/Services/mascotas.service';

@Component({
  selector: 'app-dash-board-mascota',
  templateUrl: './dash-board-mascota.component.html',
  styleUrls: ['./dash-board-mascota.component.css']
})
export class DashBoardMascotaComponent implements OnInit {

  constructor(private auth:AuthService,private mascotaService:MascotasService) { }

  public mascotas:any = []

  public newMascota:boolean = false;

  ngOnInit(): void {
    this.onUpdate();
  }

  public onUpdate():void{this.mascotas=this.auth.mascotas}

  public onUpdateNew():void{
    this.onUpdate()
    this.newMascota=false;
  }
  
}
