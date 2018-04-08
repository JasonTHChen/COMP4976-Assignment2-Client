import { Component } from '@angular/core';
// Services
import { AuthService } from './services/auth.service';
import { BoatService } from './services/boat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, BoatService]
})
export class AppComponent {
  title = 'app';
}
