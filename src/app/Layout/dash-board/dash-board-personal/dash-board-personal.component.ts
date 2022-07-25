import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-dash-board-personal',
  templateUrl: './dash-board-personal.component.html',
  styleUrls: ['./dash-board-personal.component.css']
})
export class DashBoardPersonalComponent implements OnInit {
  
  public personaForm = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.maxLength(20)]),
    apellido : new FormControl('',[Validators.required,Validators.maxLength(20)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    telefono : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)])
  })
  public isEditable:boolean = false

  constructor(private auth:AuthService,private route:Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isEdit(false)
    this.personaForm.controls['nombre'].setValue(this.auth.nombre);
    this.personaForm.controls['apellido'].setValue(this.auth.apellido);
    this.personaForm.controls['email'].setValue(this.auth.email);
    this.personaForm.controls['telefono'].setValue(this.auth.telefono);
  }

  public hasErrors(control:string):boolean{
    return this.personaForm.controls[control].invalid && (this.personaForm.controls[control].dirty || this.personaForm.controls[control].touched)
  }

  open(content:any) {this.modalService.open(content)}

  public isEdit(isedit:boolean){
    Object.keys(this.personaForm.controls).forEach(key => {
      if(isedit) this.personaForm.controls[key].enable();
      else this.personaForm.controls[key].disable();
      this.personaForm.controls['email'].disable();
      this.isEditable = isedit;
    });
  }

  public onSavePersona(){
    if(this.personaForm.valid){
      let nombre = this.personaForm.controls['nombre'].value
      let apellido = this.personaForm.controls['apellido'].value
      let telefono = this.personaForm.controls['telefono'].value
      this.auth.updateUserInfo(nombre,apellido,telefono).subscribe((req)=>{this.auth.saveUserInfo(req)})
      this.isEdit(false)
    }
  }

  public onDelete(modal:any):void{
    this.auth.delete().subscribe(()=>{
      this.auth.unloadUserInfo()
      modal.close()
      this.route.navigate([''])
    })
  }

  public onCloseSession():void{
    this.auth.unloadUserInfo()
    this.route.navigate([''])
  }
}