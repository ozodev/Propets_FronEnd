import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroAtencionService {

  public centros:any

  constructor(private http:HttpClient) {
    this.loadCentros().subscribe((req)=>{this.centros=req})
  }

  public loadCentros():Observable<any>{return this.http.get('/api/centro_atencion')}
}
