import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { Observable } from 'rxjs';
import {AuthService} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {//this is a interface
    
  constructor(private _authService:AuthService,
              private _router:Router){ }
  
  //define canActivate method
  canActivate():boolean{
     if(this._authService.loggedIn()){
         //console.log(this._authService.loggedIn())
         return true
     }else{
         //if the user is not logged in, redirect them to the login route
         this._router.navigate(['/login'])
         return false
     }
  }
  
}

