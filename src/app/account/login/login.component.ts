import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm)
  {
      if (loginForm && loginForm.valid) {
        let userName = loginForm.form.value.userName;
        let password = loginForm.form.value.password;
        
        var result = this.authService.login(userName, password, 'password')
          .subscribe(res => {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              
            } else {
              this.router.navigate(['/']);
            }
          }, error => {
            var results = error['_body'];
            this.errorMessage = error
          });
      }
  }

}
