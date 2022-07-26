import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concatAll, Subscription } from 'rxjs';
import { Cita } from 'src/app/Objects/Cita';
import { Mascota } from 'src/app/Objects/Mascota';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { CentroAtencionService } from 'src/app/Services/centro-atencion/centro-atencion.service';
import { CitaService } from 'src/app/Services/cita/cita.service';
import { StorageService } from 'src/app/Services/storage/storage.service';
import { VeterinarioService } from 'src/app/Services/veterinarios/veterinario.service';

@Component({
  selector: 'app-cita-item',
  templateUrl: './cita-item.component.html',
  styleUrls: ['./cita-item.component.css']
})
export class CitaItemComponent implements OnInit,OnDestroy {

  public mascotas:Mascota[] = []
  public citaTipos:any
  public centros:any
  public franjas:any
  public veterinarios:any
  private _edit = false;
  public error:string =''
  @Input() cita:any = {}
  @Output() cancel = new EventEmitter()
  @Output() update = new EventEmitter()
  private mascotaSuscripcion:Subscription;
  
  public estados = [
    {value:'PENDIENTE',titulo:'Pendiente'},    
    {value:'COMPLETADA',titulo:'Completado'},    
    {value:'CANCELADA',titulo:'Cancelado'},    
    {value:'ACTIVA',titulo:'Activa'},      
  ]

  public citaForm= new FormGroup({
    mascota: new FormControl('',[Validators.required]),
    fecha: new FormControl('',[Validators.required,this.dateValidaror]),
    lugar: new FormControl('',[Validators.required]),
    estado: new FormControl('',[Validators.required]),
    veterinario: new FormControl('',[Validators.required]),
    franja: new FormControl('',[Validators.required]),
    tipo: new FormControl('',[Validators.required]),
  })  

  constructor(
      private auth:AuthService,
      private centrosAtencion:CentroAtencionService,
      private citaService:CitaService,
      private veterinarioService:VeterinarioService,
      private modalService: NgbModal,
      private storage:StorageService
      ) 
    {
    this.centros=centrosAtencion.Centros
    this.citaTipos = citaService.CitasTipo;
    this.franjas = citaService.FranjaTipo;
    this.veterinarios = veterinarioService.Veterinarios;
    this.mascotas=this.storage.Mascotas;
    this.mascotaSuscripcion = this.storage.getMascotas().subscribe(()=>{this.mascotas=this.storage.Mascotas})
  }

  ngOnInit(): void {
    this.isEdit=false;
    this.updateForm();
    if(this.cita['id']==null){
      this.isEdit=true;
      this.citaForm.controls['estado'].setValue('PENDIENTE')
      this.citaForm.controls['estado'].disable()
    }
  }

  ngOnDestroy(): void {
    this.mascotaSuscripcion.unsubscribe()
  }

  private updateForm(){
    if(this.cita!=null){
      let date = new Date(this.cita['year']+'-'+this.cita['mes']+'-'+this.cita['dia'])
      this.citaForm.controls['mascota'].setValue(this.cita['paciente'])
      this.citaForm.controls['fecha'].setValue(date)
      this.citaForm.controls['lugar'].setValue(this.cita['lugar'])
      this.citaForm.controls['estado'].setValue(this.cita['status'])
      this.citaForm.controls['veterinario'].setValue(this.cita['doctor'])
      this.citaForm.controls['franja'].setValue(this.cita['franja'])
      this.citaForm.controls['tipo'].setValue(this.cita['type'])
    }
  }

  public open(modal:any):void {this.modalService.open(modal)}
  public hasErrors(control:string):boolean{return this.citaForm.controls[control].invalid && (this.citaForm.controls[control].dirty || this.citaForm.controls[control].touched)}

  public onSubmit(modal:any):void {
    this.error=''
    if(this.citaForm.invalid){
      this.error='Campos Incompletos'
      return
    }
    this.open(modal)
  }

  public onSubmitConfirm(modal:any):void{
    let cita = new Cita()
    cita.mascota=this.citaForm.controls['mascota'].value
    let fecha:Date = this.citaForm.controls['fecha'].value;
    cita.dia = fecha.getDate()
    cita.mes = fecha.getMonth()+1
    cita.year = fecha.getFullYear()
    cita.centro = this.citaForm.controls['lugar'].value
    cita.franja = this.citaForm.controls['franja'].value
    cita.type = this.citaForm.controls['tipo'].value
    cita.usuario = this.storage.Persona.email
    cita.status = this.citaForm.controls['estado'].value
    cita.veterinario = this.citaForm.controls['veterinario'].value
    if(this.cita['id']!=null){
      cita.id = this.cita['id']
      this.citaService.updateCita(cita).subscribe(()=>{
        this.update.emit();
        modal.close()
      })
      return;
    }
    this.citaService.createCita(cita).subscribe((req)=>{
      this.update.emit();
      this.cancel.emit();
      modal.close()
    },(error)=>{
      this.error = error['error']['error']
      modal.close()
    })
  }

  public onCancelSave(modal:any):void{
    modal.close();
    this.isEdit=true;
    this.citaForm.controls['estado'].disable()
  }

  public onCancel():void {
    if(this.cita!=null){
      this.isEdit=false
      this.updateForm();
      return;
    }
    this.cancel.emit()
  }

  public onDelete(modal:any){
    let cita = new Cita()
    cita.id = this.cita['id']
    this.citaService.deleteCita(cita).subscribe(()=>{
      this.update.emit()
      modal.close()
    })
  }

  private dateValidaror(control:FormControl){
    let today = new Date((new Date).getTime() + (1*24*60*60*1000))
    if(control.value>today) return null
    return {dateValidaror: {valid:false}}
  }

  public get isEdit(){return this._edit}
  public set isEdit(edit:boolean){
    if(edit) Object.keys(this.citaForm.controls).forEach((field)=>{this.citaForm.controls[field].enable()})
    else Object.keys(this.citaForm.controls).forEach((field)=>{this.citaForm.controls[field].disable()})
    this.citaForm.controls['estado'].disable()
    this._edit=edit;
  }
}