import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { AuthService } from './auth.service';
import {EventService} from './event.service';
import { AuthGuard } from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventComponent
  ],
  imports: [
    HttpClientModule,                                                                     
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthService,AuthGuard, EventService,
  {
     provide:HTTP_INTERCEPTORS,
     useClass:TokenInterceptorService,
     multi:true//use multiple interceptors if required
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
