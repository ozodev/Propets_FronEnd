import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentroAtencionService {

  private _centros:string[]

  constructor(private http:HttpClient) {
    this._centros=[]
    this.http.get('/api/centro_atencion').subscribe((req)=>{this.Centros=req})
  }

  public get Centros(){return this._centros;}
  public set Centros(data:any){this._centros=data;}
}
