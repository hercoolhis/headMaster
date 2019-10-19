import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";


@Component({
  selector: 'app-search-guest',
  templateUrl: './search-guest.component.html',
  styleUrls: ['./search-guest.component.css']
})
export class SearchGuestComponent implements OnInit {

  guests = [];
  cardGuest;
  showNote = false;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.getAllGuests();
 }

  getAllGuests() {
    this.http.get('http://localhost:3000/guests').pipe((first())).subscribe((allGuests: Array<any>) => {
      allGuests.forEach((guest: any) => {
        if (guest.email.length) {
          this.guests.push(guest.email);
        }
      });
      this.guests.sort();      
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
