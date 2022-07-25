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
import { CitasComponent } from './Layout/dash-board/citas/citas.component';
import { CitaItemComponent } from './Layout/dash-board/citas/cita-item/cita-item.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatCommonModule} from '@angular/material/core';

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
    RegisterComponent,
    CitasComponent,
    CitaItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatSliderModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
