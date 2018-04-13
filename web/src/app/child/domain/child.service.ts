import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators/catchError";
import "rxjs/add/observable/throw";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { Child } from "./child";

@Injectable()
export class ChildService {

  public static readonly GENERIC_ERROR_MESSAGE: string = "An error happened! Please try again later.";
  public static readonly CHILD_NOT_FOUND_ERROR_MESSAGE: string = "Child was not found!";

  constructor(private httpClient: HttpClient) { }

  public getChildById(id: number): Observable<Child> {

    const serviceUrl: string = `${environment.childServiceUrl}/${id}`;

    return this.httpClient.get<Child>(serviceUrl).pipe(
      catchError(
        (error: HttpErrorResponse): Observable<Child> => {

          let errorMessage: string = ChildService.GENERIC_ERROR_MESSAGE;

          if (error.status === 404) {
            errorMessage = ChildService.CHILD_NOT_FOUND_ERROR_MESSAGE;
          }
          return Observable.throw(new Error(errorMessage));
        }
      )
    );
  }

  public getAllChildren(): Observable<Child[]> {

    const serviceUrl: string = `${environment.childServiceUrl}/all`;

    return this.httpClient.get<Child[]>(serviceUrl).pipe(
      catchError(
        (error: HttpErrorResponse): Observable<Child[]> => {
          return Observable.throw(new Error(ChildService.GENERIC_ERROR_MESSAGE));
        }
      )
    );
  }

  public updateChild(child: Child): Observable<void> {

    const serviceUrl: string = `${environment.childServiceUrl}/${child.id}`;

    return this.httpClient.put<void>(serviceUrl, child).pipe(
      catchError(
        (error: HttpErrorResponse): Observable<void> => {
          return Observable.throw(new Error(ChildService.GENERIC_ERROR_MESSAGE));
        }
      )
    );
  }
}
