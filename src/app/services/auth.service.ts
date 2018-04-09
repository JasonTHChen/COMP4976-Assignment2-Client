import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IAuthentication, IUser } from '../models/user.model'

@Injectable()
export class AuthService {

  private BASE_URL: string = 'http://localhost:61831';
  private headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
  redirectUrl: string;

  constructor(private http: Http) { }

  isAuthenticated(): boolean {
    var accessToken = sessionStorage.getItem('access_token');
    if (this.isTokenExpired() || accessToken == null) {
      //console.log("false")
      this.resetToken();
      return false;
    }

    return true;
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

  login(username, password, grant_type): Observable<IAuthentication> {
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
      .map(res => {
        this.setToken(res.json() as IAuthentication);
      }).catch(this.handleError);
  }

  register(newUser: IUser) {
    if (!newUser.userName || !newUser.password) {
      return;
    }
    
    let url: string = this.BASE_URL + '/api/AccountAPI/Register';
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

    return this.http.post(url, JSON.stringify(newUser), options)
      .map(res => {
        console.log(res.json());
        return res.json();
      }).catch(this.handleError);
  }

  logout(): void {
    this.resetToken();
  }

  private handleError(error: Response): Observable<any> {
    let errorMessage = error.json();
    console.error(errorMessage);
    return Observable.throw(errorMessage || 'Server error');
  }
}
