import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";


@Injectable({
  providedIn: 'root'
})
export class GuestsService {
  
  public guests: AngularFireList<object>;
  private dbRef = '/guests';
  checkedInNumber: BehaviorSubject<number>;
  checkedInPercentage: BehaviorSubject<number>; 
  totalNumber: BehaviorSubject<number>; 
  last5Guests: BehaviorSubject<object>;

  constructor(public http: HttpClient, db: AngularFireDatabase) {
    this.guests = db.list(this.dbRef);
    this.checkedInNumber =  new BehaviorSubject<number>(0);
    this.checkedInPercentage = new BehaviorSubject<number>(0);
    this.totalNumber = new BehaviorSubject<number>(0);
    this.last5Guests = new BehaviorSubject<object>([{ }]);
  }

  
  getAllGuests() : AngularFireList<object> {
    return this.guests;
  }

  updateSingleGuest(key: string, value: any): Promise<void> {
    return this.guests.update(key, value);
  }

  async getLast5CheckedInGuest() {
    // let allGuests: any = await this.getAllGuests().toPromise(),
    // checkedInGuests = [];
    
    // allGuests.forEach((guest: any) => {
    //   if (guest.checked_in) {
    //     if (guest.checked_in === true) {
    //       checkedInGuests.push(guest);
    //     }
    //   }
    // })
    // checkedInGuests.sort(function(a,b){
    //   let bDate: any = new Date(b.checked_in_date),
    //   aDate: any = new Date(a.checked_in_date);
    //   // Turn your strings into dates, and then subtract them
    //   // to get a value that is either negative, positive, or zero.
    //   return bDate - aDate;
    // });

    // const Last5CheckedInGuest = checkedInGuests.slice(0, 5);
   
    // return Last5CheckedInGuest;
  }
 }
