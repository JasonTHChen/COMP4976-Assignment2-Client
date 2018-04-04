import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BoatsComponent } from './boats/boats.component';
import { LoginComponent } from './account/login/login.component';

// Services
import { AuthService } from './services/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoatsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'boats', component: BoatsComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
