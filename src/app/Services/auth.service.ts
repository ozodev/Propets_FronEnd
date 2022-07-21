import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private assest_token:any
  private persona = {
    apellido:'',
    nombre: '',
    email:'',
    enabled: false,
    mascotas: [],
    roles: [],
    telefono: '',
    veterinario: null
  }
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
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.token,})
    let body = new FormData()
    body.append('nombre',nombre);
    body.append('apellido',apellido);
    body.append('telefono',telefono);
    return this.http.put('/api/usuario/persona',body,{headers: httpHeaders})
  }

  public getUserInfo():Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.token})
    return this.http.get('/api/usuario',{headers:httpHeaders})
  }

  public delete():Observable<any>{
    const httpHeaders = new HttpHeaders({'Authorization': 'Bearer '+ this.token,})
    return this.http.delete('/api/usuario',{headers: httpHeaders})
  }

  public saveUserInfo(data:any){
    this.persona.apellido = data['apellido']
    this.persona.nombre = data['nombre']
    this.persona.email = data['email']
    this.persona.enabled = data['enabled']
    this.persona.mascotas = data['mascotas']
    this.persona.roles = data['roles']
    this.persona.telefono = data['telefono']
    this.persona.veterinario = data['veterinario']
  }
  public unloadUserInfo(){
    this.persona = {
      apellido:'',
      nombre: '',
      email:'',
      enabled: false,
      mascotas: [],
      roles: [],
      telefono: '',
      veterinario: null
    }
    this.token = '';
  }

  public get nombre():string{return this.persona.nombre}
  public get apellido():string{return this.persona.apellido}
  public get email():string{return this.persona.email}
  public get enabled():boolean{return this.persona.enabled}
  public get mascotas(){return this.persona.mascotas}
  public set mascotas(data:any){this.persona.mascotas=data}
  public get roles():never[]{return this.persona.roles}
  public get telefono():string{return this.persona.telefono}
  public get veterinario(){return this.persona.veterinario}
  public get token(){return this.assest_token}
  public set token(token:string){this.assest_token=token}
}
