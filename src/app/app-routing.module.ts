import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './Layout/Home/home.component';
import { DashBoardComponent } from './Layout/dash-board/dash-board.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
