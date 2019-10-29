import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuestsService {
  
  
  checkedInNumber: BehaviorSubject<number>;
  checkedInPercentage: BehaviorSubject<number>; 
  totalNumber: BehaviorSubject<number>; 

  constructor(public http: HttpClient) {
    this.checkedInNumber =  new BehaviorSubject<number>(0);
    this.checkedInPercentage = new BehaviorSubject<number>(0);
    this.totalNumber = new BehaviorSubject<number>(0);
  }

  getAllGuests() {
    return this.http.get('http://localhost:3000/guests').pipe((first()));
  }

  updateSingleGuest(guestId, updateObject) {
    return this.http.patch(`http://localhost:3000/guests/${guestId}`, updateObject);
  }
 }
