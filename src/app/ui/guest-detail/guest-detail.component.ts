import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UiService} from '../../services/ui/ui.service';
import {first} from 'rxjs/operators';
import {FbService} from '../../services/fb/fb.service';
import { HttpHeaders } from "@angular/common/http";
import { GuestsService } from "../../services/guests.service";

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-detail.component.html',
  styleUrls: ['./guest-detail.component.css']
})
export class GuestDetailComponent implements OnInit, OnDestroy {

  

  @Input() set guest(guest: string) {
    this.guestEmail = guest;   

    //get Guest Details
    this.gs.getAllGuests().pipe((first())).subscribe((allGuests: Array<any>) => {
      allGuests.forEach((guest: any) => {
        if (guest.email === this.guestEmail) {
          this.guestFirstName = guest.first_name;
          this.guestLastName = guest.last_name;
          this.guestGender = guest.gender;
          this.guestId = guest.id;

          if (guest.checked_in === true) {
            this.guestCheckedInStatus = true;
            this.guestCheckedInTime = guest.checked_in_date;
          }
        }
      });
       
    });


  }

 //Output to be Guest Checked In
  @Output() guestCheckedIn = new EventEmitter();
  guestDetails: Object;
  darkMode: boolean;
  errorMessage: string;
  guestEmail;
  guestFirstName: string;
  guestLastName: string;
  guestGender: string;
  guestId: number;
  guestCheckedInStatus = false;
  guestCheckedInTime: Date;
  checkInSuccess = false;
  sub1;
  checkedInNumber:number;
  checkedInPercentage;
  totalGuestNumber:number;
  guestChecked = false;

  constructor(public router: Router,
              public ui: UiService,
              public fb: FbService,
              public gs: GuestsService) {
  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });
    this.gs.checkedInNumber.subscribe((value) => {
      this.checkedInNumber = value;     
    });

    this.gs.totalNumber.subscribe((value) => {
      this.totalGuestNumber = value;     
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  openDetails() {}

  checkGuestIn() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    let updateObject = { checked_in : true, checked_in_date: new Date().toString() };

    this.gs.updateSingleGuest(this.guestId, updateObject).subscribe((data) => {
      this.checkInSuccess = true;
      this.guestEmail = null;
      this.gs.checkedInNumber.next(this.checkedInNumber + 1);

      this.checkedInPercentage = ((this.checkedInNumber / this.totalGuestNumber) * 100).toFixed(2);      
      this.gs.checkedInPercentage.next(this.checkedInPercentage);


      this.guestCheckedIn.emit();
      setTimeout(() => this.checkInSuccess = false, 2000);
  
    });
  }



}
