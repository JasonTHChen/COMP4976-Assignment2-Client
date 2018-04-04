import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private BASE_URL: string = 'http://localhost:61831';
  private headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http: Http) { }

  login(username, password, grant_type): Promise<any> {
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

    console.log(credential);
    console.log(body);

    console.log(url);
    return this.http.post(url, body, {headers: this.headers}).toPromise();


    //return this.http.post(url, credential, header)
  }

}
