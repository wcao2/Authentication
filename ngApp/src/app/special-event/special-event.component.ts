import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.css']
})
export class SpecialEventComponent implements OnInit {

  specialEvents=[]
  constructor(private _eventService:EventService,
              private _router:Router) { }

  ngOnInit() {
    this._eventService.getSpecialEvent()
       .subscribe(
          res=>this.specialEvents=res,
          //err=>console.log(err)
          err=>{
            if(err instanceof HttpErrorResponse){
               if(err.status===401 || err.status===500){
                  this._router.navigate(['/login'])
               }
            }
          }
       )
  }

}
