import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators/catchError";
import "rxjs/add/observable/throw";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";

import { Child } from "./child";
import { AddedChild } from "./added-child";

@Injectable()
export class ChildService {
  public static readonly GENERIC_ERROR_MESSAGE: string = "An error happened! Please try again later.";
  public static readonly CHILD_NOT_FOUND_ERROR_MESSAGE: string = "Child was not found!";
  public static readonly NOT_FOUND_ERROR_CODE: number = 404;

  constructor(private httpClient: HttpClient) { }

  public getChildById(id: number): Observable<Child> {
    const serviceUrl: string = `${environment.childServiceUrl}/${id}`;
    return this.httpClient.get<Child>(serviceUrl).pipe(
      catchError(this.errorHandler<Child>(
        new Map().set(ChildService.NOT_FOUND_ERROR_CODE, ChildService.CHILD_NOT_FOUND_ERROR_MESSAGE))
      )
    );
  }

  public getAllChildren(): Observable<Child[]> {
    const serviceUrl: string = `${environment.childServiceUrl}/all`;
    return this.httpClient.get<Child[]>(serviceUrl).pipe(
      catchError(this.errorHandler<Child[]>())
    );
  }

  public updateChild(child: Child): Observable<void> {
    const serviceUrl: string = `${environment.childServiceUrl}/${child.id}`;
    return this.httpClient.put<void>(serviceUrl, child).pipe(
      catchError(this.errorHandler<void>())
    );
  }

  public addChild(child: Child): Observable<AddedChild> {
    return this.httpClient.post<AddedChild>(environment.childServiceUrl, child).pipe(
      catchError(this.errorHandler<AddedChild>())
    );
  }

  private errorHandler<T>(errorCodeErrorMessageMap: Map<number, string> = new Map()): (error: HttpErrorResponse) => Observable<T> {
    return (error: HttpErrorResponse): Observable<T> => {
      const errorMessage: string = errorCodeErrorMessageMap.get(error.status) || ChildService.GENERIC_ERROR_MESSAGE;
      return Observable.throw(new Error(errorMessage));
    };
  }
}
