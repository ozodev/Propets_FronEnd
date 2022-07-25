import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { StorageService } from 'src/app/Services/storage/storage.service';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css']
})
export class NavegationComponent implements OnInit {

  constructor(private modalService: NgbModal,private auth:AuthService,private storage:StorageService) { }

  ngOnInit(): void {}

  open(content:any) {this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})}

  public changeModal(prevModal:any,nextModal:any):void{
    prevModal.close()
    this.open(nextModal)
  }

  public get loginStatus(){return this.storage.Persona.enable;}
  public get username(){return this.storage.Persona.email;}
}