import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MascotasService } from 'src/app/Services/mascotas.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Mascota } from 'src/app/Objects/Mascota';

@Component({
  selector: 'app-dash-board-mascota-view',
  templateUrl: './dash-board-mascota-view.component.html',
  styleUrls: ['./dash-board-mascota-view.component.css']
})
export class DashBoardMascotaViewComponent implements OnInit {

  public _editable:boolean;
  public errorMsg = '';
  public razas
  public colores
  public sizes

  @Input() mascota:Mascota;
  @Output() cancel = new EventEmitter()
  @Output() update = new EventEmitter()

  public mascotaForm:FormGroup;
  
  constructor(private mascotas:MascotasService,private modalService: NgbModal) {
    this.mascota = new Mascota()
    this.razas=this.mascotas.razas;
    this.colores=this.mascotas.colores;
    this.sizes=this.mascotas.sizes
    this._editable = true;
    this.mascotaForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.mascotaForm= new FormGroup({
      nombre : new FormControl(this.mascota.nombre,[Validators.required]),
      peso:  new FormControl((this.mascota.peso!=0)? this.mascota.peso:'',[Validators.required]),
      raza:  new FormControl(this.mascota.raza,[Validators.required]),
      color: new FormControl(this.mascota.color,[Validators.required]),
      size : new FormControl(this.mascota.size,[Validators.required])
    })
    this.editabled=(this.mascota.id=='')
  }

  public open(modal:any):void {this.modalService.open(modal)}

  public openWithCondicion(modal:any):void{
    this.errorMsg='';
    if(this.mascotaForm.invalid){
      this.errorMsg = 'Campos Incompletos';
      return;
    }
    this.editabled = false;
    this.open(modal)
  }

  public hasErrors(control:string):boolean{return this.mascotaForm.controls[control].invalid && (this.mascotaForm.controls[control].dirty || this.mascotaForm.controls[control].touched)}
  
  public onSubmit(modal:any):void{
    let mas = this.mascotaForm.value as Mascota;
    console.log(mas)
    if(this.mascota.id==''){
      this.mascotas.createMascota(mas).subscribe(()=>{
        this.mascotas.getMascotas().subscribe((req)=>{
          this.mascotas.saveMascotas(req)
          this.update.emit()
          modal.close()
        })
      })
      return;
    }
    this.mascotas.updateMascota(mas,this.mascota.id).subscribe(()=>{
      this.mascotas.getMascotas().subscribe((req)=>{
        this.mascotas.saveMascotas(req)
        this.update.emit()
        modal.close()
      })
    })
  }

  public onDelete(modal:any):void{
    this.mascotas.deleteMascota(this.mascota.id).subscribe(()=>{
      this.mascotas.getMascotas().subscribe((req)=>{
        this.mascotas.saveMascotas(req)
        this.update.emit()
        modal.close()
      })
    })
  }

  public onCancel():void{
    if(this.mascota.id==''){
      this.cancel.emit()
      return;
    }
    this.editabled = false;
    this.mascotaForm.controls['nombre'].setValue(this.mascota.nombre);
    this.mascotaForm.controls['peso'].setValue(this.mascota.peso);
    this.mascotaForm.controls['raza'].setValue(this.mascota.raza);
    this.mascotaForm.controls['color'].setValue(this.mascota.color);
    this.mascotaForm.controls['size'].setValue(this.mascota.size);
  }

  public get editabled():boolean{return this._editable}
  public set editabled(editable:boolean){
    if(editable) Object.keys(this.mascotaForm.controls).forEach(control=>{this.mascotaForm.controls[control].enable()})
    else Object.keys(this.mascotaForm.controls).forEach(control=>{this.mascotaForm.controls[control].disable()})
    this._editable=editable;
  }

}