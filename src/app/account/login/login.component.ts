import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    let sampleUser: any = {
      username: 'a' as string,
      password: 'P@$$w0rd' as string,
      grant_type: 'password' as string
    };

    var result = this.auth.login('a', 'P@$$w0rd', 'password');
  }

  login(loginForm: NgForm)
  {
      
  }

}
