import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IReservation } from '../models/reservation.model';

@Injectable()
export class ReservationService {

  private BASE_URL = "http://localhost:61831";

  constructor(private http: Http) { }

  getReservations(): Observable<IReservation[]> {
    let url: string = this.BASE_URL + '/api/reservationapi';
    let token = sessionStorage.getItem('access_token');
    
    let options = new RequestOptions({headers: new Headers({ 'Authorization': 'Bearer ' + token })});

    let data: Observable<IReservation[]> = this.http.get(url, options)
        .map(res => <IReservation[]>res.json())
        .do(data => {
          for (var _i = 0; _i < 1; _i++) {
            data[_i].boatName = data[_i].boat.boatName;
            data[_i].userName = data[_i].user.userName;
          }
          console.log('getReservations:' + JSON.stringify(data))
        })
        .catch(this.handleError);

    return data;
  }

  delete(id: number) {
    console.log(id);
    let url: string = this.BASE_URL + '/api/reservationapi/' + id;
    let token = sessionStorage.getItem('access_token');
    
    let options = new RequestOptions({headers: new Headers({ 'Authorization': 'Bearer ' + token })});
    this.http.delete(url, options)
      .map(res => {
        console.log(res.json());
        return res.json();
      }).catch(this.handleError)

  }

  private handleError(error: Response): Observable<any> {
    let errorMessage = error.json();
    console.error(errorMessage);
    return Observable.throw(errorMessage.error || 'Server error');
  }
}
