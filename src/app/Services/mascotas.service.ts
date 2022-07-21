import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private _razas:any=[]
  private _colores:any=[]
  private _sizes:any=[]
  public get razas(){return this._razas}
  public get colores(){return this._colores}
  public get sizes(){return this._sizes}
  public set razas(data:any){this._razas=data}
  public set colores(data:any){this._colores=data}
  public set sizes(data:any){this._sizes=data}

  constructor(private http:HttpClient,private auth:AuthService) {}
  public loadRazas():Observable<any>{return this.http.get<any>('/api/mascota/raza')}
  public loadColors():Observable<any>{return this.http.get<any>('/api/mascota/color')}
  public loadSizes():Observable<any>{return this.http.get<any>('/api/mascota/size')}

  public updateMascota(nombre:string,peso:string,raza:string,color:string,size:string,id:string):Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.auth.token,})
    let data = new FormData();
    data.append('nombre',nombre)
    data.append('peso',peso)
    data.append('color',color)
    data.append('size',size)
    data.append('raza',raza)
    return this.http.put<any>('/api/mascota/'+id,data,{headers: httpHeaders})
  }
  public getMascotas():Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.auth.token,})
    return this.http.get<any>('/api/mascota',{headers: httpHeaders})
  }
  public saveMascotas(data:any){this.auth.mascotas=data;}

  public createMascota(nombre:string,peso:string,raza:string,color:string,size:string):Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.auth.token,})
    let data = new FormData();
    data.append('nombre',nombre)
    data.append('peso',peso)
    data.append('color',color)
    data.append('size',size)
    data.append('raza',raza)
    return this.http.post('/api/mascota',data,{headers: httpHeaders})
  }

  public deleteMascota(id:string):Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.auth.token,})
    return this.http.delete<any>('/api/mascota/'+id,{headers: httpHeaders})
  }
}
