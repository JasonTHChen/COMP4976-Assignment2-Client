import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../services/auth.service';
import { IReservation } from '../models/reservation.model';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ReservationService, AuthService]
})
export class ReservationsComponent implements OnInit {

  reservations: IReservation[];

  constructor(private reservationService: ReservationService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getRservations()
  }

  getRservations(): void {
    if (this.authService.isAuthenticated()) {
      this.reservationService.getReservations()
      .subscribe(reservations => this.reservations = reservations, error => console.error(error));
    } else {
      this.router.navigate(['/login']);
    }
  }

  deleteReservation(reservation: IReservation): void {
    console.log("delete");
    this.reservationService.delete(reservation.reservationId);
    this.router.navigate(['/reservations']);
  }
}
