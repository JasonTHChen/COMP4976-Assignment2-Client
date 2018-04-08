import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Boat } from '../models/boat';

@Injectable()
export class BoatService {

  private BASE_URL = "http://localhost:61831";

  constructor(private http: Http) { }

  getBoats(): Promise<Boat[]> {
    let url: string = this.BASE_URL + '/api/boatsapi';
    let token = sessionStorage.getItem('access_token');
    
    let options = new RequestOptions({headers: new Headers({ 'Authorization': 'Bearer ' + token })});
    return this.http.get(url, options)
      .toPromise()
      .then(res => {
        res.json() as Boat[]
        console.log(res.json());
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
