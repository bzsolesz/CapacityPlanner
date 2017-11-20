import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Child } from '../domain/child';

@Injectable()
export class ChildService {

  constructor(private httpClient: HttpClient) { }

  getChildById(id: number): Observable<Child> {

    const serviceUrl = `${environment.childServiceUrl}/${id}`;

    return this.httpClient.get<Child>(serviceUrl);
  }
}