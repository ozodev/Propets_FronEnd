import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from '../Objects/Mascota';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private _razas:string[]=[]
  private _colores:string[]=[]
  private _sizes:string[]=[]

  constructor(private http:HttpClient,private auth:AuthService,private storage:StorageService) {
    this.loadColors().subscribe((req)=>{this.colores=req})
    this.loadRazas().subscribe((req)=>{this.razas=req})
    this.loadSizes().subscribe((req)=>{this.sizes=req})
  }
  private loadRazas():Observable<any>{return this.http.get<any>('/api/mascota/raza')}
  private loadColors():Observable<any>{return this.http.get<any>('/api/mascota/color')}
  private loadSizes():Observable<any>{return this.http.get<any>('/api/mascota/size')}

  public updateMascota(mascota:Mascota,id:string):Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.auth.token,})
    let data = new FormData();
    data.append('nombre',mascota.nombre)
    data.append('peso',mascota.peso.toString())
    data.append('color',mascota.color)
    data.append('size',mascota.size)
    data.append('raza',mascota.raza)
    return this.http.put<any>('/api/mascota/'+id,data,{headers: httpHeaders})
  }
  public getMascotas():Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.auth.token,})
    return this.http.get<any>('/api/mascota',{headers: httpHeaders})
  }
  public saveMascotas(data:any){this.storage.saveMascotas(data)}

  public createMascota(mascota:Mascota):Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.auth.token,})
    let data = new FormData();
    data.append('nombre',mascota.nombre)
    data.append('peso',mascota.peso.toString())
    data.append('color',mascota.color)
    data.append('size',mascota.size)
    data.append('raza',mascota.raza)
    return this.http.post('/api/mascota',data,{headers: httpHeaders})
  }

  public deleteMascota(id:string):Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.auth.token,})
    return this.http.delete<any>('/api/mascota/'+id,{headers: httpHeaders})
  }

  public get razas(){return this._razas}
  public get colores(){return this._colores}
  public get sizes(){return this._sizes}
  public set razas(data:any){this._razas=data}
  public set colores(data:any){this._colores=data}
  public set sizes(data:any){this._sizes=data}
}
