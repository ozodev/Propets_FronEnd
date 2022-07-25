import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { StorageService } from 'src/app/Services/storage/storage.service';

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
  private _editable = true;
  public registerForm = new FormGroup({
    nombre: new FormControl("",[Validators.required,Validators.pattern("^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$")]),
    apellido: new FormControl("",[Validators.required,Validators.pattern("^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$")]),
    telefono: new FormControl("",[Validators.required,Validators.pattern('^[1-9]+[0-9]*$'),Validators.minLength(10),Validators.maxLength(10)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(16)]),
    repassword: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(16)])
  })

  constructor(private auth:AuthService,private storage:StorageService) { }

  ngOnInit(): void {}

  public closeModal(){this.changeModal.emit()}

  public hasErrors(control:string):boolean{return this.registerForm.controls[control].invalid && (this.registerForm.controls[control].dirty || this.registerForm.controls[control].touched)}

  public onSubmit(){
    this.error=''
    this.editabled=false;
    if(this.registerForm.invalid || this.registerForm.controls['password'].value==''){
      this.error = 'Hay campos incompletos'
      this.editabled=true;
      return;
    }
    if(this.registerForm.controls['password'].value != this.registerForm.controls['repassword'].value){
      this.error = 'Las Contraseñas deben ser Iguales'
      this.editabled=true;
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
          this.storage.savePersona(req1)
          this.registermodal.close()
        })
      })
    })
  }

  public get editabled(){return this._editable;}
  public set editabled(edit:boolean){
    if(edit) Object.keys(this.registerForm.controls).forEach(control =>{this.registerForm.controls[control].enable()})
    else Object.keys(this.registerForm.controls).forEach(control =>{this.registerForm.controls[control].disable()})
    this._editable=edit;
  }
}