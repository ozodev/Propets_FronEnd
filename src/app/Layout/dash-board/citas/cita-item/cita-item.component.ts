import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CentroAtencionService } from 'src/app/Services/centro-atencion.service';
import { CITAService } from 'src/app/Services/cita.service';
import { VeterinarioService } from 'src/app/Services/veterinario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-cita-item',
  templateUrl: './cita-item.component.html',
  styleUrls: ['./cita-item.component.css']
})
export class CitaItemComponent implements OnInit {

  public mascotas = []
  @Input() cita:any
  @Output() cancel = new EventEmitter()
  public citaTipos:any
  public centros:any
  public franjas:any
  public veterinarios:any
  private _edit = true;
  public get isEdit(){return this._edit}
  public set isEdit(edit:boolean){
    if(edit) Object.keys(this.citaForm.controls).forEach((field)=>{this.citaForm.controls[field].enable()})
    else Object.keys(this.citaForm.controls).forEach((field)=>{this.citaForm.controls[field].disable()})
    this._edit=edit;
  }
  
  public estados = [
    {value:'PENDIENTE',titulo:'Pendiente'},    
    {value:'COMPLETADA',titulo:'Completado'},    
    {value:'CANCELADA',titulo:'Cancelado'},    
    {value:'ACTIVA',titulo:'Activa'},      
  ]

  public citaForm= new FormGroup({
    mascota: new FormControl('',[Validators.required]),
    fecha: new FormControl('',[Validators.required]),
    lugar: new FormControl('',[Validators.required]),
    estado: new FormControl('',[Validators.required]),
    veterinario: new FormControl('',[Validators.required]),
    franja: new FormControl('',[Validators.required]),
    tipo: new FormControl('',[Validators.required]),
  })  

  constructor(
      private auth:AuthService,
      private centrosAtencion:CentroAtencionService,
      private citaService:CITAService,
      private veterinarioService:VeterinarioService,
      private modalService: NgbModal
      ) 
    {
    this.centros=centrosAtencion.centros
    this.citaTipos = citaService.CitasTipo;
    this.franjas = citaService.FranjaTipo;
    this.veterinarios = veterinarioService.Veterinarios;
  }


  ngOnInit(): void {
    this.isEdit=true;
    if(this.cita!=null)this.citaForm.controls['estado'].setValue(this.cita['status'])
    else {
      this.citaForm.controls['estado'].setValue('PENDIENTE')
      this.citaForm.controls['estado'].disable()
    }
  }

  public open(modal:any):void {this.modalService.open(modal)}
  public isEnable(control:string):boolean{return this.citaForm.controls[control].valid && (this.citaForm.controls[control].value!='')}
  public hasErrors(control:string):boolean{return this.citaForm.controls[control].invalid &&(this.citaForm.controls[control].dirty || this.citaForm.controls[control].touched)}

  public onSubmit(modal:any):void {
    if(this.citaForm.invalid){
      console.log('Campos Incompletos')
      return
    }
    this.isEdit=false;
    this.open(modal)
  }

  public onCancelSave(modal:any):void{
    modal.close();
    this.isEdit=true;
    this.citaForm.controls['estado'].disable()
  }

  public onCancel():void {
    if(this.cita!=null){
      return;
    }
    this.cancel.emit()
  }
}