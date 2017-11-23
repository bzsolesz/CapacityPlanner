import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Child } from '../domain/child';

@Injectable()
export class ChildService {

  constructor(private httpClient: HttpClient) { }

  getChildById(id: number): Observable<Child> {

    const serviceUrl = `${environment.childServiceUrl}/${id}`;

    return this.httpClient.get<Child>(serviceUrl).pipe(
      catchError(
        (error: HttpErrorResponse): Observable<Child> => {
          var errorMessage: string = "An error happened! Please try again later.";
          if (error.status === 404) {
            errorMessage = "Child was not found!";
          }
          return Observable.throw(new Error(errorMessage));
        }
      )
    );
  }
}