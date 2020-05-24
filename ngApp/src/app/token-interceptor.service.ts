import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthService} from './auth.service'



@Injectable()
//1:make a class implement HTTP interceptor interface 
//2: define an intercept method
export class TokenInterceptorService implements HttpInterceptor{

  //use inject to get a instance of auth service
  //don't direcetly inject in constructor, some dependency error
  constructor(private injector: Injector) { }

  //define intercept method
  intercept(req, next){
     let authService=this.injector.get(AuthService)

     //if there is a request to the server, it will runs
     let tokenizedReq=req.clone({
        setHeaders:{
           Authorization:`Bearer ${authService.getToken()}`
        }
     })
     return next.handle(tokenizedReq)
  }
}