import { Component, OnInit } from '@angular/core';
import { GuestsService } from "../../services/guests.service";


@Component({
  selector: 'app-search-guest',
  templateUrl: './search-guest.component.html',
  styleUrls: ['./search-guest.component.css']
})
export class SearchGuestComponent implements OnInit {

  guests = [];
  cardGuest;
  showNote = false;
  allGuestNumber;
  checkedInGuestsNumber = 0;
  checkedInPercentage;

  constructor(public gs: GuestsService) { }

  ngOnInit() {
    this.getAllGuests();
    this.gs.checkedInNumber.subscribe((value) => {
      this.checkedInGuestsNumber = value;
    });
    this.gs.checkedInPercentage.subscribe((value) => {
      this.checkedInPercentage = value;
    });

    this.gs.totalNumber.subscribe((value) => {
      this.allGuestNumber = value;
    });
 }

  getAllGuests() {

    this.gs.getAllGuests().subscribe((allGuests: Array<any>) => {      
      allGuests.forEach((guest: any) => {
        
        if (guest.email.length) {
          this.guests.push(guest.email);
        }        

        if (guest.checked_in) {
          if (guest.checked_in === true) {
            this.checkedInGuestsNumber++;
          }
        }
      });    

      this.guests.sort(); 
      this.allGuestNumber = this.guests.length; 
      this.gs.checkedInNumber.next(this.checkedInGuestsNumber);
      this.gs.totalNumber.next(this.guests.length);
      
      //calculate percentage
      this.checkedInPercentage = ((this.checkedInGuestsNumber / this.allGuestNumber) * 100).toFixed(2);
      this.gs.checkedInPercentage.next(this.checkedInPercentage);

          
    });
  }  
 
  findGuest(guest) {
    if (this.guests.includes(guest)) {
      this.cardGuest = guest;
      this.showNote = false;
    } else if (guest.leading > 0) {
      this.showNote = true;
    }
  }



}
