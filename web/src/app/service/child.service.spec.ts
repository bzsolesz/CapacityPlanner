import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

import { ChildService } from './child.service';
import { Child } from '../domain/child';

describe('Child Service Tests', () => {

  const expectedServiceUrl = "http://localhost:8081/ChildService/child/999";

  var testedService: ChildService;

  var httpMock: HttpTestingController;

  var testChild: Child;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildService],
      imports: [HttpClientTestingModule]
    })

    testedService = TestBed.get(ChildService);
    httpMock = TestBed.get(HttpTestingController);

    initTestChild();
  });

  it('should make a HTTP GET request to ChildService/child/${id} server endpoint and return the Child', () => {

    testedService.getChildById(testChild.id).subscribe(
      child => {
        expect(child).toBe(testChild);
      }
    );

    const testRequest = httpMock.expectOne(expectedServiceUrl);

    expect(testRequest.request.method).toBe("GET");

    testRequest.flush(testChild);
  });

  it('should return a generic error message for HTTP error statuses other than 404', () => {

    testedService.getChildById(testChild.id).subscribe(
      child => {
        fail('Child service request should return an error!');
      },
      (error: Error) => {
        expect(error.message).toBe(ChildService.GENERIC_ERROR_MESSAGE);
      }
    );

    httpMock.expectOne(expectedServiceUrl).flush('', {status: 500, statusText: ''});
  });

  it('should return a "Child Not Found" error message for HTTP 404', () => {

    testedService.getChildById(testChild.id).subscribe(
      child => {
        fail('Child service request should return an error!');
      },
      (error: Error) => {
        expect(error.message).toBe(ChildService.CHILD_NOT_FOUND_ERROR_MESSAGE);
      }
    );

    httpMock.expectOne(expectedServiceUrl).flush('', {status: 404, statusText: ''});
  });

  afterEach(() => {
    httpMock.verify();
  });

  function initTestChild() {
    testChild = new Child();
    testChild.id = 999;
  };
});