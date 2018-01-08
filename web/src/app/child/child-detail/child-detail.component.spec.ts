import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';

import { ChildDetailComponent } from './child-detail.component';
import { ChildService } from '../domain/child.service';
import { Child } from '../domain/child';

describe('Child-Detail Component', () => {

  var fixture: ComponentFixture<ChildDetailComponent>;
  var testedComponent: ChildDetailComponent;

  class RouterSpy {
    navigate = jasmine.createSpy('navigate');
  }

  class ActivatedRouteStub {
    private _testParamMap: ParamMap;
    private subject = new BehaviorSubject(this._testParamMap);

    paramMap = this.subject.asObservable();

    set testParamMap(params: {}) {
      this._testParamMap = convertToParamMap(params);
      this.subject.next(this._testParamMap);
    }
  }

  class ChildServiceSpy {
    getChildById = jasmine.createSpy('getChildById');
  }

  class ChildDetailPage {
    errorMessageDisplay: DebugElement;
    childDetailDisplay: DebugElement;
    childDetailDisplayId: DebugElement;
    childDetailDisplayName: DebugElement;
    childDetailDisplayDateOfBirth: DebugElement;
    goToChildrenPageButton: DebugElement;

    initPage(): void {
      this.errorMessageDisplay = fixture.debugElement.query(By.css('#errorMessageDisplay'));
      this.childDetailDisplay = fixture.debugElement.query(By.css('#childDetailDisplay'));
      this.goToChildrenPageButton = fixture.debugElement.query(By.css('#goToChildrenPageButton'));

      if (this.childDetailDisplay !== null) {

        let childDetailDisplayItems = this.childDetailDisplay.queryAll(By.css('p'));

        this.childDetailDisplayId = childDetailDisplayItems[1];
        this.childDetailDisplayName = childDetailDisplayItems[2];
        this.childDetailDisplayDateOfBirth = childDetailDisplayItems[3];
      }
    }
  }

  var routerSpy: RouterSpy;
  var activatedRouteStub: ActivatedRouteStub;
  var childServiceSpy: ChildServiceSpy;
  var childDetailPage: ChildDetailPage;
  var testChild: Child;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ChildDetailComponent ],
      providers: [
        { provide: Router, useClass: RouterSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: ChildService, useClass: ChildServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDetailComponent);
    testedComponent = fixture.componentInstance;

    routerSpy = TestBed.get(Router);
    activatedRouteStub = fixture.debugElement.injector.get(ActivatedRoute) as any;
    childServiceSpy = fixture.debugElement.injector.get(ChildService) as any;

    childDetailPage = new ChildDetailPage();

    initTestChild();

    activatedRouteStub.testParamMap = {id: testChild.id};
  });

  it(`should get Child details by id (from url /child/:id) at initialization from ChildService
    and display it on the page`, () => {

    childServiceSpy.getChildById.and.returnValue(of(testChild));

    fixture.detectChanges();
    childDetailPage.initPage();

    expect(childDetailPage.childDetailDisplayId.nativeElement.textContent).toBe(testChild.id.toString());
    expect(childDetailPage.childDetailDisplayName.nativeElement.textContent).toBe(testChild.firstName + ' ' + testChild.surname);
    expect(childDetailPage.childDetailDisplayDateOfBirth.nativeElement.textContent).toBe(testChild.dateOfBirth);

    expect(childDetailPage.errorMessageDisplay).toBeNull();
  });


  it('should display the error message when query for child by id failed', () => {

    var error: Error = new Error("An error has happened");

    childServiceSpy.getChildById.and.returnValue(Observable.throw(error));

    fixture.detectChanges();
    childDetailPage.initPage();

    expect(childDetailPage.errorMessageDisplay.nativeElement.textContent).toBe(error.message);

    expect(childDetailPage.childDetailDisplay).toBeNull();
  });

  it('should have a button for navigating to the Children page', () => {

    childServiceSpy.getChildById.and.returnValue(of(testChild));

    fixture.detectChanges();
    childDetailPage.initPage();

    childDetailPage.goToChildrenPageButton.triggerEventHandler('click', null);

    expect(routerSpy.navigate).toHaveBeenCalledWith(["/child/all"]);
  });

  function initTestChild() {
    testChild = new Child();
    testChild.id = 999;
    testChild.firstName = 'FIRST_NAME';
    testChild.surname = 'SURNAME';
    testChild.dateOfBirth = '10/12/2017';
  };
});