import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public get CitasTipo(){return this._citas_tipo}
  public set CitasTipo(tipos:any){this._citas_tipo=tipos}
  public get FranjaTipo(){return this._franja_tipo}
  public set FranjaTipo(tipos:any){this._franja_tipo=tipos}
}
