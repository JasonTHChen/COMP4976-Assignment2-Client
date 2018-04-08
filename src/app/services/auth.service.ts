import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { IAuthentication } from '../models/user.model'

@Injectable()
export class AuthService {

  private BASE_URL: string = 'http://localhost:61831';
  private headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private http: Http) { }

  isAuthenticated(): boolean {
    var accessToken = sessionStorage.getItem('accesss_token');
    if (this.isTokenExpired || accessToken == null) {
      this.resetToken();
      return false;
    }
  }

  isTokenExpired(): boolean {
    var expiration = new Date(parseInt(sessionStorage.getItem('expires_in')));
    return expiration < new Date();
  }

  private resetToken(): void {
    sessionStorage.removeItem('tokenType');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('expires_in');
  }

  private setToken(auth: IAuthentication): void {
    sessionStorage.setItem('tokenType', auth.token_type);
    sessionStorage.setItem('access_token', auth.access_token);
    var expiry = new Date();
    expiry.setSeconds(expiry.getTime() + auth.expires_in);
    sessionStorage.setItem('expires_in', expiry.getTime().toString());
  }

  login(username, password, grant_type): Promise<IAuthentication> {
    let url: string = this.BASE_URL + '/connect/token';

    var credential = {
      username: username,
      password: password,
      grant_type: grant_type
    };

    var body = "";

    for (var key in credential) {
      if (body.length) {
        body += "&";
      }

      body += key + "=";
      body += encodeURIComponent(credential[key]);
    }

    return this.http.post(url, body, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.setToken(response.json() as IAuthentication);
      })
      .catch(this.handleError);
  }

  logout(): void {
    this.resetToken();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
