import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() loginmodal:any
  @Output() changeModal = new EventEmitter()

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(8)])
  })
  public loginerror:boolean = false;
  public loginStatus:boolean = false;
  public username:string = '';

  public isEmailValid():boolean{return this.loginForm.controls['email'].invalid && ( this.loginForm.controls['email'].dirty || this.loginForm.controls['email'].touched)}
  public getEmailError():string{
    let errors:any = this.loginForm.controls['email'].errors
    if(errors.email !=null) return 'No es un Correo'
    if(errors.required !=null) return 'Informacion Necesaria'
    return 'Argumentos Invalidos'
  }

  public isPasswordValid():boolean{return this.loginForm.controls['password'].invalid &&( this.loginForm.controls['password'].dirty || this.loginForm.controls['password'].touched)}
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
          this.auth.saveUserInfo(req)
            this.loginmodal.close()
            this.loginStatus=true;
            this.username = this.auth.email;
        })
      },()=>{this.loginerror=true})
    }
  }
  public closeModal(){this.changeModal.emit()}
}
