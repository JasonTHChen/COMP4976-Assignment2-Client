import { Component, OnInit } from '@angular/core';

import { ReservationService } from '../services/reservation.service';
import { IReservation } from '../models/reservation.model' 

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ReservationService]
})
export class ReservationsComponent implements OnInit {

  reservations: IReservation[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getReservations()
      .subscribe(reservations => this.reservations = reservations, error => console.error(error));
  }
}
