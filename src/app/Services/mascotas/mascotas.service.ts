import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/Objects/Mascota';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private _razas:string[]=[]
  private _colores:string[]=[]
  private _sizes:string[]=[]

  constructor(private http:HttpClient,private auth:AuthService,private storage:StorageService) {
    this.http.get<any>('/api/mascota/color').subscribe((req)=>{this.colores=req})
    this.http.get<any>('/api/mascota/raza').subscribe((req)=>{this.razas=req})
    this.http.get<any>('/api/mascota/size').subscribe((req)=>{this.sizes=req})
  }

  public updateMascota(mascota:Mascota,id:string):Observable<any>{return this.http.put<any>('/api/mascota/'+id,this.getData(mascota),{headers: this.auth.authorization})}
  public getMascotas():Observable<any>{return this.http.get<any>('/api/mascota',{headers: this.auth.authorization})}
  public saveMascotas(data:any){this.storage.saveMascotas(data)}
  public createMascota(mascota:Mascota):Observable<any>{return this.http.post('/api/mascota',this.getData(mascota),{headers: this.auth.authorization})}
  public deleteMascota(id:string):Observable<any>{return this.http.delete<any>('/api/mascota/'+id,{headers: this.auth.authorization})}

  private getData(mascota:Mascota){
    let data = new FormData()
    Object.keys(mascota).forEach((key:string)=>{data.append(key,(new Map(Object.entries(mascota)).get(key)))})
    return data;
  }

  public get razas(){return this._razas}
  public set razas(data:any){this._razas=data}
  public get colores(){return this._colores}
  public set colores(data:any){this._colores=data}
  public get sizes(){return this._sizes}
  public set sizes(data:any){this._sizes=data}

}