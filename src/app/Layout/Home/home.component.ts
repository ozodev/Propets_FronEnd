import { Component, OnInit } from '@angular/core';
import { CentroAtencionService } from 'src/app/Services/centro-atencion/centro-atencion.service';
import { CitaService } from 'src/app/Services/cita/cita.service';
import { MascotasService } from 'src/app/Services/mascotas/mascotas.service';
import { VeterinarioService } from 'src/app/Services/veterinarios/veterinario.service';

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

  constructor(
    private mascotaService:MascotasService,
    private centro:CentroAtencionService,
    private citasService:CitaService,
    private veterinarioService:VeterinarioService) { }

  ngOnInit(): void {}

}
