import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';//import eventService

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events =[]

  constructor(private _eventService:EventService) { }//inject eventService

  ngOnInit() {
     //subscribe the observable 
     this._eventService.getEvents()
      .subscribe(
         res=>this.events=res,
         err=>console.log(err)
      )
  }

}
