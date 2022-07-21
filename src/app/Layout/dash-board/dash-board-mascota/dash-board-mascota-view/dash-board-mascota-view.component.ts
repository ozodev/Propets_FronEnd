import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MascotasService } from 'src/app/Services/mascotas.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dash-board-mascota-view',
  templateUrl: './dash-board-mascota-view.component.html',
  styleUrls: ['./dash-board-mascota-view.component.css']
})
export class DashBoardMascotaViewComponent implements OnInit {

  public mascotaForm= new FormGroup({
    nombre : new FormControl('',[Validators.required]),
    peso:  new FormControl('',[Validators.required]),
    raza:  new FormControl(''),
    color: new FormControl(''),
    size : new FormControl('')
  })
  @Input() nombre:string=''
  @Input() peso:string=''
  @Input() raza:string=''
  @Input() color:string=''
  @Input() size:string=''
  @Input() id:string=''
  @Output() cancel = new EventEmitter()
  @Output() update = new EventEmitter()

  public _editable = true;
  public errorMsg = '';
  public get editabled():boolean{return this._editable}
  public set editabled(editable:boolean){
    if(editable) Object.keys(this.mascotaForm.controls).forEach(control=>{this.mascotaForm.controls[control].enable()})
    else Object.keys(this.mascotaForm.controls).forEach(control=>{this.mascotaForm.controls[control].disable()})
    this._editable=editable;
  }
  public razas = []
  public colores = []
  public sizes = []
  constructor(private mascotas:MascotasService,private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.id!=''){
      this.editabled=false
      this.mascotaForm.controls['nombre'].setValue(this.nombre);
      this.mascotaForm.controls['peso'].setValue(this.peso);
      this.mascotaForm.controls['raza'].setValue(this.raza);
      this.mascotaForm.controls['color'].setValue(this.color);
      this.mascotaForm.controls['size'].setValue(this.size)
    }
    this.razas=this.mascotas.razas;
    this.colores=this.mascotas.colores;
    this.sizes=this.mascotas.sizes
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

  public hasErrors(control:string):boolean{
    return this.mascotaForm.controls[control].invalid && (this.mascotaForm.controls[control].dirty || this.mascotaForm.controls[control].touched)
  }
  
  public onSubmit(modal:any):void{
    let nombre = this.mascotaForm.controls['nombre'].value;
    let peso = this.mascotaForm.controls['peso'].value;
    let color = this.mascotaForm.controls['color'].value;
    let raza = this.mascotaForm.controls['raza'].value;
    let size = this.mascotaForm.controls['size'].value;
    if(this.id==''){
      this.mascotas.createMascota(nombre,peso,raza,color,size).subscribe(()=>{
        this.mascotas.getMascotas().subscribe((req)=>{
          this.mascotas.saveMascotas(req)
          this.update.emit()
          modal.close()
        })
      })
      return;
    }
    this.mascotas.updateMascota(nombre,peso,raza,color,size,this.id).subscribe(()=>{
      this.mascotas.getMascotas().subscribe((req)=>{
        this.mascotas.saveMascotas(req)
        this.update.emit()
        modal.close()
      })
    })
  }

  public onDelete(modal:any):void{
    this.mascotas.deleteMascota(this.id).subscribe(()=>{
      this.mascotas.getMascotas().subscribe((req)=>{
        this.mascotas.saveMascotas(req)
        this.update.emit()
        modal.close()
      })
    })
  }

  public onCancel():void{
    if(this.id==''){
      this.cancel.emit()
      return;
    }
    this.editabled = false;
    this.mascotaForm.controls['nombre'].setValue(this.nombre);
    this.mascotaForm.controls['peso'].setValue(this.peso);
    this.mascotaForm.controls['raza'].setValue(this.raza);
    this.mascotaForm.controls['color'].setValue(this.color);
    this.mascotaForm.controls['size'].setValue(this.size);
  }

}
