import { Injectable } from '@angular/core';
import { Mascota } from 'src/app/Objects/Mascota';
import { Persona} from 'src/app/Objects/Persona';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _mascotas:Mascota[] = []
  private _persona:Persona = new Persona()
 
  constructor() {}

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

  public savePersona(data:any):void{
    let persona = new Persona()
    persona.nombre=data['nombre']
    persona.apellido=data['apellido']
    persona.email=data['email']
    persona.enable=data['enabled']
    persona.telefono=data['telefono']
    persona.roles=data['roles']
    this.Persona=persona;
  }

  public set Mascotas(mascotas:Mascota[]){this._mascotas=mascotas} 
  public get Mascotas(){return this._mascotas;}

  public get Persona():Persona{return this._persona;}
  public set Persona(persona:Persona){this._persona=persona;}
}