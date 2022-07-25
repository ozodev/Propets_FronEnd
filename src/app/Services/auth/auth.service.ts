import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private assest_token:any
  
  constructor(private http:HttpClient) { }

  public login(email:string,password:string):Observable<any>{
    const credencials = btoa('AngularAppProPets' + ':' + '123456789')
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+ credencials
    })
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',email);
    params.set('password',password);
    return this.http.post<any>('/oauth/token',params.toString(),{headers: httpHeaders});
  }

  public register(email:string,password:string):Observable<any>{
    let body = new FormData()
    body.append('email',email);
    body.append('password',password);
    return this.http.post<any>('/api/usuario',body)
  }

  public updateUserInfo(nombre:string,apellido:string,telefono:string):Observable<any>{
    let body = new FormData()
    body.append('nombre',nombre);
    body.append('apellido',apellido);
    body.append('telefono',telefono);
    return this.http.put('/api/usuario/persona',body,{headers: this.authorization})
  }

  public getUserInfo():Observable<any>{return this.http.get('/api/usuario',{headers:this.authorization})}

  public delete():Observable<any>{return this.http.delete('/api/usuario',{headers: this.authorization})}

  public get authorization(){return new HttpHeaders({'Authorization': 'Bearer '+ this.token,})}
  public get token(){return this.assest_token}
  public set token(token:string){this.assest_token=token}
}
