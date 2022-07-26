import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from 'src/app/Objects/Cita';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private _citas_tipo = []
  private _franja_tipo = []
  constructor(private auth:AuthService,private http:HttpClient){
    this.http.get<any>('/api/cita/tipo').subscribe((req)=>{this.CitasTipo=req})
    this.http.get<any>('/api/cita/franja').subscribe((req)=>{this.FranjaTipo=req})
  }
  
  public getCitas():Observable<any>{return this.http.get<any>("/api/cita",{headers: this.auth.authorization})}

  public createCita(cita:Cita):Observable<any>{return this.http.post<any>('/api/cita',this.getData(cita),{headers: this.auth.authorization})}
  public updateCita(cita:Cita):Observable<any>{return this.http.put<any>('/api/cita/'+cita.id,this.getData(cita),{headers:this.auth.authorization})}
  public deleteCita(cita:Cita):Observable<any>{return this.http.delete<any>('/api/cita/'+cita.id,{headers:this.auth.authorization})}

  private getData(mascota:Cita){ 
    let data = new FormData()
    data.append('centro',mascota.centro)
    data.append('veterinario',mascota.veterinario)
    data.append('usuario',mascota.usuario)
    data.append('mascota',mascota.mascota)
    data.append('mes', mascota.mes.toString())
    data.append('dia',mascota.dia.toString())
    data.append('year',mascota.year.toString())
    data.append('franja',mascota.franja)
    data.append('status',mascota.status)
    data.append('type',mascota.type)
    return data;
  }

  public get CitasTipo(){return this._citas_tipo}
  public set CitasTipo(tipos:any){this._citas_tipo=tipos}
  public get FranjaTipo(){return this._franja_tipo}
  public set FranjaTipo(tipos:any){this._franja_tipo=tipos}
}
