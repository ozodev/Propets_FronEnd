import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private _veterinarios=[]
  public get Veterinarios(){return this._veterinarios;}
  public set Veterinarios(data:any){this._veterinarios=data;}

  constructor(private http:HttpClient) { }

  public getVeterinarios():Observable<any>{return this.http.get('/api/veterinario')}
}
