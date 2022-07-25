import { Injectable } from '@angular/core';
import { Mascota } from 'src/app/Objects/Mascota';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _mascotas:Mascota[] = []
 
  constructor() {}

  public set Mascotas(mascotas:Mascota[]){this._mascotas=mascotas} 
  public get Mascotas(){return this._mascotas;}
  public addMascota(mascota:Mascota):void{this._mascotas.push(mascota)}
  public removeMascota(mascota:Mascota):void{this._mascotas.slice(this._mascotas.indexOf(mascota),1)}
  public saveMascotas(data:any):void{
    this.Mascotas = data.map((item:any)=>{
      let mascota = new Mascota()
      mascota.color=item['color'];
      mascota.nombre = item['nombre']
      mascota.id =item['id']
      mascota.peso =item['peso']
      mascota.raza = item['raza']
      mascota.size =item['size']
      return mascota
    });
  }
}