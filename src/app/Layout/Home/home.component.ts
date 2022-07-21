import { Component, OnInit } from '@angular/core';
import { MascotasService } from 'src/app/Services/mascotas.service';

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

  constructor(private mascotaService:MascotasService) { }

  ngOnInit(): void {
    this.mascotaService.loadColors().subscribe((req)=>{
      this.mascotaService.colores=req
    })
    this.mascotaService.loadRazas().subscribe((req)=>{
      this.mascotaService.razas=req
    })
    this.mascotaService.loadSizes().subscribe((req)=>{
      this.mascotaService.sizes=req
    })
  }

}
