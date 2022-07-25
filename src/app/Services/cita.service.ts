import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CITAService {

  private _citas_tipo = []
  public get CitasTipo(){return this._citas_tipo}
  public set CitasTipo(tipos:any){this._citas_tipo=tipos}

  private _franja_tipo = []
  public get FranjaTipo(){return this._franja_tipo}
  public set FranjaTipo(tipos:any){this._franja_tipo=tipos}

  constructor(private auth:AuthService,private http:HttpClient) { }

  public getCitas():Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.auth.token,})
    return this.http.get<any>("/api/cita",{headers: httpHeaders})
  }

  public getTipos():Observable<any>{return this.http.get<any>('/api/cita/tipo')}
  public getFranjas():Observable<any>{return this.http.get<any>('/api/cita/franja')}
}
