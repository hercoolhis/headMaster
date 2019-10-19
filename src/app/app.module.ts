import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireLite } from "angularfire-lite";
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from "@angular/forms";
import { SignupComponent } from './pages/signup/signup.component';
import { ErrorComponent } from './ui/error/error.component';
import { SearchGuestComponent } from './ui/search-guest/search-guest.component';
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { HttpClientModule } from "@angular/common/http";
import { GuestDetailComponent } from './ui/guest-detail/guest-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    SearchGuestComponent,
    GuestDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireLite.forRoot(environment.config),
    NguiAutoCompleteModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
