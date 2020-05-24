import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

//in auth.service,includes methods related to login and registration
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    //create a property that stores the back-end register API url
    private _registerUrl="http://localhost:3000/api/register";
    //create property point to the back-end login URL
    private _loginUrl="http://localhost:3000/api/login";


    constructor(private http:HttpClient,
                private _router: Router) { }
    
    //accept user object which are email and password
    registerUser(user){
      //return details of the registered user as a response
      return  this.http.post<any>(this._registerUrl,user)
    }

    //define login user method that makes the actual HTTP call
    loginUser(user){
       //return a response(login details) that the backend API sends whenever it's available
       //any: return observable without any errors
       return this.http.post<any>(this._loginUrl,user)
    }

    loggedIn(){
      // short way to cast a variable to be a boolean (dobule !! exclamation mark)
      //https://brianflove.com/2014/09/02/whats-the-double-exclamation-mark-for-in-javascript/
      return !!localStorage.getItem('token')
    }

    getToken(){
       //use this in the token.interceptor.service
       return localStorage.getItem('token')
    }

    logoutUser(){
       localStorage.removeItem('token')
       this._router.navigate(['/events'])
    }
}
