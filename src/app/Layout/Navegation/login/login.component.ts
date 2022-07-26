import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { StorageService } from 'src/app/Services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginerror:boolean = false;
  public loginStatus:boolean = false;
  public username:string = '';

  @Input() loginmodal:any
  @Output() changeModal = new EventEmitter()

  public loginForm:FormGroup = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(8)])
  })

  constructor(private auth:AuthService,private storage:StorageService) { }

  ngOnInit(): void {}

  public hasErrors(control:string){return this.loginForm.controls[control].invalid && ( this.loginForm.controls[control].dirty || this.loginForm.controls[control].touched)}

  public getEmailError():string{
    let errors:any = this.loginForm.controls['email'].errors
    if(errors.email !=null) return 'No es un Correo'
    if(errors.required !=null) return 'Informacion Necesaria'
    return 'Argumentos Invalidos'
  }

  public getPasswordError():string{
    let errors:any = this.loginForm.controls['password'].errors
    if(errors.minlength !=null) return 'Contraseña debe tener 8 o mas caracteres'
    if(errors.required !=null) return 'Informacion Necesaria'
    return 'Argumentos Invalidos'
  }

  public onSubmmit(){
    if(this.loginForm.valid){
      let email:string = this.loginForm.controls['email'].value;
      let password:string = this.loginForm.controls['password'].value
      this.loginerror = false;
      this.auth.login(email,password).subscribe((req)=>{
        this.auth.token = req['access_token'];
        this.auth.getUserInfo().subscribe((req)=>{
          this.storage.savePersona(req)
          this.storage.saveMascotas(req['mascotas'])
          this.loginmodal.close()
          this.loginStatus=true;
          this.username = this.storage.Persona.email;
        })
      },()=>{this.loginerror=true})
    }
  }
  public closeModal(){this.changeModal.emit()}
}