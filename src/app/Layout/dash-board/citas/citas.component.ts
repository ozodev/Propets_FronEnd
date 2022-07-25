import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CITAService } from 'src/app/Services/cita.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  
  public citas:any = []
  public newCita=false;

  constructor(private auth:AuthService,private citasService:CITAService) {
    this.updateCitas()
  }

  ngOnInit(): void {}

  public updateCitas(){this.citasService.getCitas().subscribe((req)=>{this.citas=req})}

  

}
