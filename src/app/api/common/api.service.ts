import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ApiConstants } from '../api_constants';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  private formatErrors(error: any) {
    console.log(error)
    return throwError(error.error);
  }

  

  doGetObservable(url: string): Observable<any> {
    console.log(url);
    return this.http.get(url, { headers : this.headers });
  }



}
