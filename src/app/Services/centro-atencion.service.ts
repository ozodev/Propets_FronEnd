import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroAtencionService {

  public centros:any

  constructor(private http:HttpClient) {}

  public loadCentros():Observable<any>{return this.http.get('/api/centro_atencion')}
}
