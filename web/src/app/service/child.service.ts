import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Child } from '../domain/child';

const CHILD_SERVICE_URL = "http://localhost:8081/ChildService/child";

@Injectable()
export class ChildService {

  constructor(private httpClient: HttpClient) { }

  getChildById(id: number): Observable<Child> {

    const serviceUrl = `${CHILD_SERVICE_URL}/${id}`;

    return this.httpClient.get<Child>(serviceUrl);
  }
}