import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import { SignupComponent } from "./pages/signup/signup.component";
import { HistoryComponent } from "./ui/history/history.component";
import {AuthGuard} from './guards/auth.guard';
import {AppGuard} from './guards/app.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AppGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate:[AuthGuard]},
  {path: 'history', component: HistoryComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
