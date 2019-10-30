import { Component, OnInit } from '@angular/core';
import { GuestsService } from "../../services/guests.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  last5Guests;

  constructor(public gs: GuestsService) { }

  ngOnInit() {
    this.gs.last5Guests.subscribe((value) => {
      this.last5Guests = value;      
    });    

    this.updateLast5guests();   
  }

  async updateLast5guests() {
    let Last5CheckedInGuest = await this.gs.getLast5CheckedInGuest();

    this.gs.last5Guests.next(Last5CheckedInGuest);

    console.log(this.last5Guests);
  }

}
