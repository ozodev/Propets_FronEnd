import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './Layout/Home/home.component';
import { NavegationComponent } from './Layout/Navegation/navegation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashBoardComponent } from './Layout/dash-board/dash-board.component';
import { HttpClientModule } from '@angular/common/http';
import { DashBoardMenuComponent } from './Layout/dash-board/dash-board-menu/dash-board-menu.component';
import { DashBoardPersonalComponent } from './Layout/dash-board/dash-board-personal/dash-board-personal.component';
import { DashBoardMascotaComponent } from './Layout/dash-board/dash-board-mascota/dash-board-mascota.component';
import { DashBoardMascotaViewComponent } from './Layout/dash-board/dash-board-mascota/dash-board-mascota-view/dash-board-mascota-view.component';
import { LoginComponent } from './Layout/Navegation/login/login.component';
import { RegisterComponent } from './Layout/Navegation/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavegationComponent,
    DashBoardComponent,
    DashBoardMenuComponent,
    DashBoardPersonalComponent,
    DashBoardMascotaComponent,
    DashBoardMascotaViewComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
