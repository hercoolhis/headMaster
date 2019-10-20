import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UiService} from '../../services/ui/ui.service';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {FbService} from '../../services/fb/fb.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-detail.component.html',
  styleUrls: ['./guest-detail.component.css']
})
export class GuestDetailComponent implements OnInit, OnDestroy {

  @Input() set guest(guest: string) {
    this.guestEmail = guest;   

    //get Guest Details
    this.http.get('http://localhost:3000/guests').pipe((first())).subscribe((allGuests: Array<any>) => {
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
  guestChecked = false;

  constructor(public router: Router,
              public ui: UiService,
              public fb: FbService,
              public http: HttpClient) {
  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  openDetails() {
    
  }

  checkGuestIn() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.patch(`http://localhost:3000/guests/${this.guestId}`, { checked_in : true, checked_in_date: new Date().toString() }).subscribe((data) => {
      console.log(`Put request successful, ${data}`);
      this.checkInSuccess = true;
      this.guestEmail = null;
      this.guestCheckedIn.emit();
      setTimeout(() => this.checkInSuccess = false, 2000);
  
    });
  }

  // addCity() {
  //   this.fb.addCity(this.cityName).subscribe(() => {
  //     this.cityName = null;
  //     this.maxTemp = null;
  //     this.minTemp = null;
  //     this.state = null;
  //     this.temp = null;
  //     this.cityAdded = true;
  //     this.cityStored.emit();
  //     setTimeout(() => this.cityAdded = false, 2000);
  //   });
  // }


}
