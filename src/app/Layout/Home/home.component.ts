import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [
    `
    @media only screen and (max-width: 450px) { .item{height: 180px;width: 150px;}} 
    @media only screen and (max-width: 350px) { 
      .item{
        height: 250px;
        width: 100px;
      }
    } 
    `
  ]
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {}
}