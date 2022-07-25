import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/Objects/Persona';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { StorageService } from 'src/app/Services/storage/storage.service';

@Component({
  selector: 'app-dash-board-personal',
  templateUrl: './dash-board-personal.component.html',
  styleUrls: ['./dash-board-personal.component.css']
})
export class DashBoardPersonalComponent implements OnInit {
  
  public personaForm = new FormGroup({})
  public _editable:boolean= false;

  constructor(private auth:AuthService,private route:Router,private modalService: NgbModal,private storage:StorageService) { }

  ngOnInit(): void {
    this.editable=false
    this.personaForm = new FormGroup({
      nombre: new FormControl(this.storage.Persona.nombre,[Validators.required,Validators.maxLength(20)]),
      apellido : new FormControl(this.storage.Persona.apellido,[Validators.required,Validators.maxLength(20)]),
      email : new FormControl(this.storage.Persona.email,[Validators.required,Validators.email]),
      telefono : new FormControl(this.storage.Persona.telefono,[Validators.required,Validators.minLength(10),Validators.maxLength(10)])
    })
  }

  public hasErrors(control:string):boolean{return this.personaForm.controls[control].invalid && (this.personaForm.controls[control].dirty || this.personaForm.controls[control].touched)}

  public open(content:any) {this.modalService.open(content)}

  public onSavePersona(){
    if(this.personaForm.valid){
      let nombre = this.personaForm.controls['nombre'].value
      let apellido = this.personaForm.controls['apellido'].value
      let telefono = this.personaForm.controls['telefono'].value
      this.auth.updateUserInfo(nombre,apellido,telefono).subscribe((req)=>{this.storage.savePersona(req)})
      this.editable=false
    }
  }

  public onDelete(modal:any):void{
    this.auth.delete().subscribe(()=>{
      this.storage.Persona = new Persona()
      modal.close()
      this.route.navigate([''])
    })
  }

  public onCloseSession():void{
    this.storage.Persona = new Persona()
    this.route.navigate([''])
  }

  public get editable(){return this._editable}
  public set editable(edit:boolean){
    if(edit) Object.keys(this.personaForm.controls).forEach(key => { this.personaForm.controls[key].enable()});
    else  Object.keys(this.personaForm.controls).forEach(key => { this.personaForm.controls[key].disable()});
    this._editable=edit;
  }
}