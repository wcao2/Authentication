import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from './events/events.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

//this is a routing module where I configure different routes for my app

const routes: Routes = [
    {
        //when user just navigates to just localhost, then redirect to the events route,and event component is rendered
        path:'',
        redirectTo:'/events',
        pathMatch:'full'
    },
    {
        path:'events',
        component:EventsComponent
    },
    {
        path:'special',
        component:SpecialEventComponent,
        //return true, navigation allowed
        canActivate: [AuthGuard]
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
