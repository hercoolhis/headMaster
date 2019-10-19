import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UiService} from '../../services/ui/ui.service';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {FbService} from '../../services/fb/fb.service';
import { HttpClient } from "@angular/common/http";

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
