import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ChildDetailComponent } from './child-detail.component';
import { ChildService } from '../service/child.service';
import { Child } from '../domain/child';

describe('Child-Detail Component Tests', () => {

  var fixture: ComponentFixture<ChildDetailComponent>;
  var testedComponent: ChildDetailComponent;

  class ChildServiceSpy {
    getChildById = jasmine.createSpy('getChildById');
  }

  class ChildDetailPage {
    childIdInput: DebugElement;
    queryButton: DebugElement;
    errorMessageDisplay: DebugElement;
    childDetailDisplay: DebugElement;
    childDetailDisplayId: DebugElement;

    initPage(): void {
      this.childIdInput = fixture.debugElement.query(By.css('#childIdInput'));
      this.queryButton = fixture.debugElement.query(By.css('#queryButton'));
      this.errorMessageDisplay = fixture.debugElement.query(By.css('#errorMessageDisplay'));
      this.childDetailDisplay = fixture.debugElement.query(By.css('#childDetailDisplay'));

      if (this.childDetailDisplay !== null) {
        this.childDetailDisplayId = this.childDetailDisplay.queryAll(By.css('p'))[1];
      }
    }
  }

  var childServiceSpy: ChildServiceSpy;
  var childDetailPage: ChildDetailPage;
  var testChild: Child;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ChildDetailComponent ],
      providers: [ {provide: ChildService, useClass: ChildServiceSpy} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ChildDetailComponent);
    testedComponent = fixture.componentInstance;

    childServiceSpy = fixture.debugElement.injector.get(ChildService) as any;

    childDetailPage = new ChildDetailPage();

    initTestChild();
  });

  it('should not call Child Service or display child details, error message after initialization', () => {

    fixture.detectChanges();
    childDetailPage.initPage();

    expect(childServiceSpy.getChildById).not.toHaveBeenCalled();

    expect(childDetailPage.childIdInput.nativeElement.placeholder).toBe('Child ID...');
    expect(childDetailPage.queryButton).not.toBeNull();
    expect(childDetailPage.errorMessageDisplay).toBeNull();
    expect(childDetailPage.childDetailDisplay).toBeNull();
  });

  it('should display detail of queried child if present', () => {

    testedComponent.child = testChild;

    fixture.detectChanges();
    childDetailPage.initPage();

    expect(childDetailPage.childDetailDisplay).not.toBeNull();

    expect(childDetailPage.childDetailDisplayId.nativeNode.textContent).toBe(testChild.id.toString());

    var childDetailDisplayNodes = childDetailPage.childDetailDisplay.queryAll(By.css('p'));

    expect(childDetailDisplayNodes[2].nativeElement.textContent).toBe(testChild.firstName + ' ' + testChild.surname);
    expect(childDetailDisplayNodes[3].nativeElement.textContent).toBe(testChild.dateOfBirth);
  });

  it('should query child by id when "Query" button is clicked and display child details', fakeAsync(() => {

    playQueryChildActivityOnPage(clickOnQueryButtonActivityFunction, testChild.id, Observable.of(testChild));

    expect(childServiceSpy.getChildById).toHaveBeenCalledWith(testChild.id.toString());

    expectTestChildToBeDisplayedAndNoErrorMessage();
  }));

  it('should display the error message when query for child by id failed', fakeAsync(() => {

    var error: Error = new Error("An error has happened");

    playQueryChildActivityOnPage(clickOnQueryButtonActivityFunction, testChild.id, Observable.throw(error));

    expect(childServiceSpy.getChildById).toHaveBeenCalledWith(testChild.id.toString());

    expect(testedComponent.queryErrorMessage).toBe(error.message);
    expect(childDetailPage.errorMessageDisplay.nativeElement.textContent).toBe(error.message);

    expect(testedComponent.child).toBeNull();
    expect(childDetailPage.childDetailDisplay).toBeNull();
  }));

  it('should set the child id input field to empty after "Query" button was clicked', fakeAsync(() => {

    playQueryChildActivityOnPage(clickOnQueryButtonActivityFunction, testChild.id, Observable.of(testChild));

    expect(childDetailPage.childIdInput.nativeElement.value).toBe('');
  }));

  it('should query child by id when Enter was hit on input field and display child details', fakeAsync(() => {

    playQueryChildActivityOnPage(hitEnterOnChildIdInputActivityFunction, testChild.id, Observable.of(testChild));

    expect(childServiceSpy.getChildById).toHaveBeenCalledWith(testChild.id.toString());

    expectTestChildToBeDisplayedAndNoErrorMessage();
  }));

  it('should set the child id input field to empty after Enter was pressed', fakeAsync(() => {

    playQueryChildActivityOnPage(hitEnterOnChildIdInputActivityFunction, testChild.id, Observable.of(testChild));

    expect(childDetailPage.childIdInput.nativeElement.value).toBe('');

  }));

  function initTestChild() {
    testChild = new Child();
    testChild.id = 999;
    testChild.firstName = 'FIRST_NAME';
    testChild.surname = 'SURNAME';
    testChild.dateOfBirth = '10/12/2017';
  };

  function clickOnQueryButtonActivityFunction() {
    return childDetailPage.queryButton.triggerEventHandler('click', null);
  };

  function hitEnterOnChildIdInputActivityFunction() {
    return childDetailPage.childIdInput.triggerEventHandler('keyup.enter', null);
  };

  function playQueryChildActivityOnPage(activity: Function, childId: number, returnValue: Observable<any>) {
    childServiceSpy.getChildById.and.returnValue(returnValue);

    childDetailPage.initPage();

    childDetailPage.childIdInput.nativeElement.value = childId.toString();
    activity();

    tick();

    fixture.detectChanges();
    childDetailPage.initPage();
  };

  function expectTestChildToBeDisplayedAndNoErrorMessage() {
    expect(testedComponent.child).toBe(testChild);
    expect(childDetailPage.childDetailDisplayId.nativeElement.textContent).toBe(testChild.id.toString());

    expect(testedComponent.queryErrorMessage).toBeNull();
    expect(childDetailPage.errorMessageDisplay).toBeNull();
  }
});