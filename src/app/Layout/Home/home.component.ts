import { Component, OnInit } from '@angular/core';
import { CentroAtencionService } from 'src/app/Services/centro-atencion.service';
import { CITAService } from 'src/app/Services/cita.service';
import { MascotasService } from 'src/app/Services/mascotas.service';
import { VeterinarioService } from 'src/app/Services/veterinario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [
    `
    @media only screen and (max-width: 450px) { .item{height: 180px;width: 150px;}} 
    @media only screen and (max-width: 350px) { 
      .item{
        height: 250px;
        width: 100px;
      }
    } 
    `
  ]
})
export class HomeComponent implements OnInit {

  constructor(private mascotaService:MascotasService,private centro:CentroAtencionService,private citasService:CITAService,private veterinarioService:VeterinarioService) { }

  ngOnInit(): void {
    this.citasService.getTipos().subscribe((req)=>{this.citasService.CitasTipo=req})
    this.citasService.getFranjas().subscribe((req)=>{this.citasService.FranjaTipo=req})
    this.veterinarioService.getVeterinarios().subscribe((req)=>{this.veterinarioService.Veterinarios=req})
  }

}
