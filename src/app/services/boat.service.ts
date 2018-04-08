import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Boat } from '../models/boat';

@Injectable()
export class BoatService {

  private BASE_URL = "http://localhost:61831";

  constructor(private http: Http) { }

  getBoats(): Observable<Boat[]> {
    let url: string = this.BASE_URL + '/api/boatsapi';
    let token = sessionStorage.getItem('access_token');
    
    let options = new RequestOptions({headers: new Headers({ 'Authorization': 'Bearer ' + token })});

    let data: Observable<Boat[]> = this.http.get(url, options)
        .map(res => <Boat[]>res.json())
        .do(data => console.log('getBoats:' + JSON.stringify(data)))
        .catch(this.handleError);

    return data;
  }

  private handleError(error: Response): Observable<any> {
    let errorMessage = error.json();
    console.error(errorMessage);
    return Observable.throw(errorMessage.error || 'Server error');
  }
}
