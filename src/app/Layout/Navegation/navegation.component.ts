import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css']
})
export class NavegationComponent implements OnInit {

  constructor(private modalService: NgbModal,private auth:AuthService) { }

  ngOnInit(): void {}

  open(content:any) {this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})}

  public get loginStatus(){return this.auth.enabled;}
  public get username(){return this.auth.email;}

  public changeModal(prevModal:any,nextModal:any):void{
    prevModal.close()
    this.open(nextModal)
  }
}