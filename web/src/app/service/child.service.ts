import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Child } from '../domain/child';

@Injectable()
export class ChildService {

  static readonly GENERIC_ERROR_MESSAGE = "An error happened! Please try again later.";
  static readonly CHILD_NOT_FOUND_ERROR_MESSAGE = "Child was not found!";

  constructor(private httpClient: HttpClient) { }

  getChildById(id: number): Observable<Child> {

    const serviceUrl = `${environment.childServiceUrl}/${id}`;

    return this.httpClient.get<Child>(serviceUrl).pipe(
      catchError(
        (error: HttpErrorResponse): Observable<Child> => {

          var errorMessage: string = ChildService.GENERIC_ERROR_MESSAGE;

          if (error.status === 404) {
            errorMessage = ChildService.CHILD_NOT_FOUND_ERROR_MESSAGE;
          }
          return Observable.throw(new Error(errorMessage));
        }
      )
    );
  }

  getAllChildren(): Observable<Child[]> {

    const serviceUrl = `${environment.childServiceUrl}/all`;

    return this.httpClient.get<Child[]>(serviceUrl).pipe(
      catchError(
        (error: HttpErrorResponse): Observable<Child[]> => {
          return Observable.throw(new Error(ChildService.GENERIC_ERROR_MESSAGE));
        }
      )
    )
  }
}