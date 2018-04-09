import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/index';
import { IUser } from '../../models/user.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(signupForm: NgForm) {
    if (signupForm && signupForm.valid) {
      let user: IUser = {
        userName: signupForm.form.value.userName,
        email: signupForm.form.value.email,
        password: signupForm.form.value.password,
        confirmPassword: signupForm.form.value.confirmPassword,
        firstName: signupForm.form.value.firstName,
        lastName: signupForm.form.value.lastName,
        street: signupForm.form.value.street,
        city: signupForm.form.value.city,
        province: signupForm.form.value.province,
        postalCode: signupForm.form.value.postalCode,
        country: signupForm.form.value.country,
        mobileNumber: signupForm.form.value.mobileNumber,
        sailingExperience: signupForm.form.value.sailingExperience
      }

      console.log(user.password);
      console.log(user.confirmPassword);

      var result = this.authService.register(user)
        .subscribe(
          response => {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
            } else {
              this.router.navigate(['/']);
            }
          },
          error => {
            var results = error['_body'];
            this.errorMessage = error.statusText + ' ' + error;
          }
        );
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }

}
