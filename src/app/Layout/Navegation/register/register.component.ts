import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() registermodal:any
  @Output() changeModal = new EventEmitter()
  @Input() registerModal:any
  public error = '';
  public registerForm = new FormGroup({
    nombre: new FormControl("",[Validators.required,Validators.pattern("^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$")]),
    apellido: new FormControl("",[Validators.required,Validators.pattern("^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$")]),
    telefono: new FormControl("",[Validators.required,Validators.pattern('^[1-9]+[0-9]*$'),Validators.minLength(10),Validators.maxLength(10)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(16)]),
    repassword: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(16)])
  })

  constructor(private auth:AuthService) { }

  ngOnInit(): void {}

  public closeModal(){this.changeModal.emit()}

  public hasErrors(control:string):boolean{
    return this.registerForm.controls[control].invalid && (this.registerForm.controls[control].dirty || this.registerForm.controls[control].touched)
  }

  public onSubmit(){
    this.error=''
    Object.keys(this.registerForm.controls).forEach(control =>{this.registerForm.controls[control].disable()})
    if(this.registerForm.invalid){
      this.error = 'Hay campos incompletos'
      Object.keys(this.registerForm.controls).forEach(control =>{this.registerForm.controls[control].enable()})
      return;
    }
    if(this.registerForm.controls['password'].value != this.registerForm.controls['repassword'].value){
      this.error = 'Las Contraseñas deben ser Iguales'
      Object.keys(this.registerForm.controls).forEach(control =>{this.registerForm.controls[control].enable()})
      return;
    }
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value
    this.auth.register(email,password).subscribe(()=>{
      this.auth.login(email,password).subscribe(req =>{
        this.auth.token = req['access_token'];
        let nombre = this.registerForm.controls['nombre'].value;
        let apelido = this.registerForm.controls['apellido'].value;
        let telefono = this.registerForm.controls['telefono'].value;
        this.auth.updateUserInfo(nombre,apelido,telefono).subscribe((req1)=>{
          this.auth.saveUserInfo(req1)
          this.registermodal.close()
        })
      })
    })
  }
}