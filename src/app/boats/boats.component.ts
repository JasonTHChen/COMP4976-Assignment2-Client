import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { BoatService } from '../services/boat.service';
import { Boat } from '../models/boat'

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.css']
})
export class BoatsComponent implements OnInit {

  boats: Boat[];

  constructor(private authService: AuthService, private boatService: BoatService) { }

  ngOnInit(): void {
    this.getBoats();

    console.log(this.boats);
  }

  getBoats(): void {
    
    console.log(this.boatService.getBoats());
  }

}
