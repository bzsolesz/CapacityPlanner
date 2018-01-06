import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

import { ChildService } from './child.service';
import { Child } from '../domain/child';

describe('Child Service', () => {

  var testedService: ChildService;

  var httpMock: HttpTestingController;

  var testChild1: Child;
  var testChild2: Child;

  var getTestChild1Url: string;
  var getAllChildrenUrl: string = 'http://localhost:8081/ChildService/child/all';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildService],
      imports: [HttpClientTestingModule]
    })

    testedService = TestBed.get(ChildService);
    httpMock = TestBed.get(HttpTestingController);

    initTestChildren();

    getTestChild1Url = "http://localhost:8081/ChildService/child/" + testChild1.id;
  });

  it('getChildById - should make a HTTP GET request to ChildService/child/${id} server endpoint and return the Child', () => {

    testedService.getChildById(testChild1.id).subscribe(
      child => {
        expect(child).toBe(testChild1);
      }
    );

    const testRequest = httpMock.expectOne(getTestChild1Url);

    expect(testRequest.request.method).toBe("GET");

    testRequest.flush(testChild1);
  });

  it('getChildById - should return a generic error message for HTTP error statuses other than 404', () => {

    expectGenericErrorMessage(
      () => { return testedService.getChildById(testChild1.id); },
      getTestChild1Url
    );
  });

  it('getChildById - should return a "Child Not Found" error message for HTTP 404', () => {

    testedService.getChildById(testChild1.id).subscribe(
      child => {
        fail('Child service request should return an error!');
      },
      (error: Error) => {
        expect(error.message).toBe(ChildService.CHILD_NOT_FOUND_ERROR_MESSAGE);
      }
    );

    httpMock.expectOne(getTestChild1Url).flush('', {status: 404, statusText: ''});
  });

  it('getAllChildren - should make a HTTP GET request to ChildService/child/all server endpoint and return all Children', () => {

    testedService.getAllChildren().subscribe(
      children => {
        expect(children.length).toBe(2);
        expect(children[0]).toBe(testChild1);
        expect(children[1]).toBe(testChild2);
      }
    );

    const testRequest = httpMock.expectOne(getAllChildrenUrl);

    expect(testRequest.request.method).toBe("GET");

    testRequest.flush([testChild1, testChild2]);
  });

  it('getAllChildren - should return empty array if no child', () => {

    testedService.getAllChildren().subscribe(
      children => {
        expect(children.length).toBe(0);
      }
    );

    httpMock.expectOne(getAllChildrenUrl).flush([]);
  });

  it('getAllChildren - should return a generic error message if an error happened', () => {

    expectGenericErrorMessage(
      () => { return testedService.getAllChildren(); },
      getAllChildrenUrl
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  function initTestChildren() {
    testChild1 = new Child();
    testChild1.id = 1;

    testChild2 = new Child();
    testChild2.id = 2;
  };

  function expectGenericErrorMessage(calledServiceMethod: Function, expectedCallUrl): void {
    calledServiceMethod().subscribe(
      result => {
        fail('Child service request should return an error!');
      },
      (error: Error) => {
        expect(error.message).toBe(ChildService.GENERIC_ERROR_MESSAGE);
      }
    );

    httpMock.expectOne(expectedCallUrl).flush('', {status: 500, statusText: ''});
  }
});