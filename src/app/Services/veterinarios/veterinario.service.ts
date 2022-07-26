import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private _veterinarios=[]
 
  constructor(private http:HttpClient) {
    this.getVeterinarios().subscribe((req)=>{this.Veterinarios=req})
  }

  public getVeterinarios():Observable<any>{return this.http.get('/api/veterinario')}

  public get Veterinarios(){return this._veterinarios;}
  public set Veterinarios(data:any){this._veterinarios=data;}
}
