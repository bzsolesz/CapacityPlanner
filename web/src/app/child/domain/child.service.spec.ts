import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";

import { ChildService } from "./child.service";
import { Child } from "./child";
import { AddedChild } from "./added-child";

describe("Child Service", () => {
  let testedService: ChildService;
  let httpMock: HttpTestingController;
  let testChild1: Child;
  let testChild2: Child;
  let testChildToAdd: Child;
  let testChild1Url: string;
  const getAllChildrenUrl: string = "http://localhost:8081/ChildService/child/all";
  const addChildUrl: string = "http://localhost:8081/ChildService/child";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChildService]
    });

    testedService = TestBed.get(ChildService);
    httpMock = TestBed.get(HttpTestingController);

    initTestChildren();
    testChild1Url = "http://localhost:8081/ChildService/child/" + testChild1.id;
  });

  it("getChildById - should make a HTTP GET request to ChildService/child/${id} server endpoint and return the Child", () => {
    testedService.getChildById(testChild1.id).subscribe(
      (child: Child) => expect(child).toBe(testChild1)
    );

    const testRequest: TestRequest = httpMock.expectOne(testChild1Url);

    expect(testRequest.request.method).toBe("GET");

    testRequest.flush(testChild1);
  });

  it("getChildById - should return a generic error message for HTTP error statuses other than 404", () => {
    expectGenericErrorMessage(
      () => testedService.getChildById(testChild1.id),
      testChild1Url
    );
  });

  it("getChildById - should return a 'Child Not Found' error message for HTTP 404", () => {
    testedService.getChildById(testChild1.id).subscribe(
      (child: Child) => fail("Child service request should return an error!"),
      (error: Error) => expect(error.message).toBe(ChildService.CHILD_NOT_FOUND_ERROR_MESSAGE)
    );

    httpMock.expectOne(testChild1Url).flush("", {status: 404, statusText: ""});
  });

  it("getAllChildren - should make a HTTP GET request to ChildService/child/all server endpoint and return all Children", () => {
    testedService.getAllChildren().subscribe(
      (children: Child[]) => {
        expect(children.length).toBe(2);
        expect(children[0]).toBe(testChild1);
        expect(children[1]).toBe(testChild2);
      }
    );

    const testRequest: TestRequest = httpMock.expectOne(getAllChildrenUrl);

    expect(testRequest.request.method).toBe("GET");

    testRequest.flush([testChild1, testChild2]);
  });

  it("getAllChildren - should return empty array if no child", () => {
    testedService.getAllChildren().subscribe(
      (children: Child[]) => expect(children.length).toBe(0)
    );

    httpMock.expectOne(getAllChildrenUrl).flush([]);
  });

  it("getAllChildren - should return a generic error message if an error happened", () => {
    expectGenericErrorMessage(
      () => testedService.getAllChildren(),
      getAllChildrenUrl
    );
  });

  it("updateChild - should make a HTTP PUT request to ChildService/child/${id} server endpoint and update the Child", () => {
    testedService.updateChild(testChild1).subscribe();

    const testRequest: TestRequest = httpMock.expectOne(testChild1Url);

    expect(testRequest.request.method).toBe("PUT");
    expect(testRequest.request.body).toEqual(testChild1);

    testRequest.flush(null);
  });

  it("updateChild - should return a generic error message if an error happened", () => {
    expectGenericErrorMessage(
      () => testedService.updateChild(testChild1),
      testChild1Url
    );
  });

  it("addChild - should make a HTTP POST request to ChildService/child server endpoint to add a child and return its id", () => {
    const testAddedChild: AddedChild = {id: 999};

    testedService.addChild(testChildToAdd).subscribe(
      (addedChild: AddedChild) => {
        expect(addedChild.id).toBe(testAddedChild.id);
      }
    );
    const testRequest: TestRequest = httpMock.expectOne(addChildUrl);

    expect(testRequest.request.method).toBe("POST");
    expect(testRequest.request.body).toEqual(testChildToAdd);

    testRequest.flush(testAddedChild);
  });

  it("addChild - should return a generic error message if an error happened", () => {
    expectGenericErrorMessage(
      () => testedService.addChild(testChildToAdd),
      addChildUrl
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  function initTestChildren(): void {
    testChild1 = {id: 1, firstName: undefined, surname: undefined, dateOfBirth: undefined};
    testChild2 = {id: 2, firstName: undefined, surname: undefined, dateOfBirth: undefined};
    testChildToAdd = {id: undefined, firstName: "FIRST_NAME", surname: "SURNAME", dateOfBirth: "07/07/1970"};
  }

  function expectGenericErrorMessage(calledServiceMethod: Function, expectedCallUrl: string): void {
    calledServiceMethod().subscribe(
      (result: object) => fail("Child service request should return an error!"),
      (error: Error) => expect(error.message).toBe(ChildService.GENERIC_ERROR_MESSAGE)
    );

    httpMock.expectOne(expectedCallUrl).flush("", {status: 500, statusText: ""});
  }
});
