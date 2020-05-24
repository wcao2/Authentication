import { Injectable } from '@angular/core';
//import HttpClient and inject it
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //create the properties that point to the backend API
  private _eventUrl="http://localhost:3000/api/events";
  private _specialEventsUrl="http://localhost:3000/api/special";

  constructor(private http:HttpClient) { }

  //returns the array of regular events
  getEvents(){
    return this.http.get<any>(this._eventUrl)
  }

  //returns the array of special events
  getSpecialEvent(){
    return this.http.get<any>(this._specialEventsUrl)
  }

  //make a HTTP call to the backend API to fetch the events data
}
