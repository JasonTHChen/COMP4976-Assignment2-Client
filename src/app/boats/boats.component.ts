import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { BoatService } from '../services/boat.service';
import { Boat } from '../models/boat' 

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.css'],
  providers: [BoatService]
})
export class BoatsComponent implements OnInit {

  boats: Boat[];

  constructor(private boatService: BoatService) { }

  ngOnInit(): void {
    this.getBoats();
  }

  getBoats(): void {
    this.boatService.getBoats()
      .subscribe(boats => this.boats = boats, error => console.error(error));
  }
}
