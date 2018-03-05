import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';

import * as utility from "../../utility";
import { defaultDatePickerConfig } from "../../ngx-bootstrap";

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

  @Directive({
    selector: '[bsDatepicker]'
  })
  class DatePickerStub {
    @Input() bsConfig: any;
  }

  class ChildServiceSpy {
    getChildById = jasmine.createSpy('getChildById');
    updateChild = jasmine.createSpy('updateChild');
  }

  class ChildDetailPage {
    
    childDetailDisplay: DebugElement;
    childDetailDisplayId: DebugElement;
    childDetailDisplayFirstName: DebugElement;
    childDetailDisplaySurname: DebugElement;
    childDetailDisplayDateOfBirth: DebugElement;

    childDetailDisplayFirstNameFormGroup: DebugElement;
    childDetailDisplaySurnameFormGroup: DebugElement;
    childDetailDisplayDateOfBirthFormGroup: DebugElement;

    childDetailForm: DebugElement;
    errorMessageDisplay: DebugElement;
    goToChildrenPageButton: DebugElement;
    saveButton: DebugElement;

    initPage(): void {
      this.errorMessageDisplay = fixture.debugElement.query(By.css('#errorMessageDisplay'));
      this.childDetailDisplay = fixture.debugElement.query(By.css('#childDetailDisplay'));
      this.goToChildrenPageButton = fixture.debugElement.query(By.css('#goToChildrenPageButton'));

      if (this.childDetailDisplay !== null) {

        this.childDetailDisplayId = this.childDetailDisplay.query(By.css('#id'));
        this.childDetailDisplayFirstName = this.childDetailDisplay.query(By.css('#firstName'));
        this.childDetailDisplaySurname = this.childDetailDisplay.query(By.css('#surname'));
        this.childDetailDisplayDateOfBirth = this.childDetailDisplay.query(By.css('#dateOfBirth'));

        this.childDetailDisplayFirstNameFormGroup = this.childDetailDisplay.query(By.css('#firstNameFormGroup'));
        this.childDetailDisplaySurnameFormGroup = this.childDetailDisplay.query(By.css('#surnameFormGroup'));
        this.childDetailDisplayDateOfBirthFormGroup = this.childDetailDisplay.query(By.css('#dateOfBirthFormGroup'));

        this.childDetailForm = this.childDetailDisplay.query(By.css('form'));
        this.saveButton = this.childDetailDisplay.query(By.css('#saveButton'));
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
      declarations: [ ChildDetailComponent, DatePickerStub ],
      providers: [
        { provide: Router, useClass: RouterSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: ChildService, useClass: ChildServiceSpy }
      ],
      imports: [ FormsModule ]
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
    and display it on the page`, fakeAsync(() => {

    childServiceSpy.getChildById.and.returnValue(of(testChild));

    fixture.detectChanges();
    tick();
    childDetailPage.initPage();

    expect(childDetailPage.childDetailDisplayId.nativeElement.textContent).toBe(testChild.id.toString());
    expect(childDetailPage.childDetailDisplayFirstName.nativeElement.value).toBe(testChild.firstName);
    expect(childDetailPage.childDetailDisplaySurname.nativeElement.value).toBe(testChild.surname);
    expect(childDetailPage.childDetailDisplayDateOfBirth.nativeElement.value).toEqual(
      utility.fromEnGbBStringToDate(testChild.dateOfBirth).toString());

    expect(childDetailPage.errorMessageDisplay).toBeNull();
  }));

  it('should display the error message when query for child by id failed', () => {

    var error: Error = new Error("An error has happened");

    childServiceSpy.getChildById.and.returnValue(Observable.throw(error));

    fixture.detectChanges();
    childDetailPage.initPage();

    expect(childDetailPage.errorMessageDisplay.nativeElement.textContent).toBe(error.message);

    expect(childDetailPage.childDetailDisplay).toBeNull();
  });

  it('should have the First Name field required', fakeAsync(() => {

    initPageWithTestChild();

    expectFormGroupToHasErrorForEmptyInput(
      childDetailPage.childDetailDisplayFirstNameFormGroup, childDetailPage.childDetailDisplayFirstName);
  }));

  it('should have the Surname field required', fakeAsync(() => {

    initPageWithTestChild();

    expectFormGroupToHasErrorForEmptyInput(
      childDetailPage.childDetailDisplaySurnameFormGroup, childDetailPage.childDetailDisplaySurname);
  }));

  it('should have the Date of Birth field required', fakeAsync(() => {

    initPageWithTestChild();

    expectFormGroupToHasErrorForEmptyInput(
      childDetailPage.childDetailDisplayDateOfBirthFormGroup, childDetailPage.childDetailDisplayDateOfBirth);
  }));

  it("should set default config for the date of birth datepicker", fakeAsync(() => {
    initPageWithTestChild();

    expect(childDetailPage.childDetailDisplayDateOfBirth.injector.get(DatePickerStub).bsConfig).toBe(defaultDatePickerConfig);
  }));

  it('should have the Save button disabled if the form is invalid or pristine (not dirty)', fakeAsync(() => {

    initPageWithTestChild();

    expect(childDetailPage.saveButton.nativeElement.disabled).toBeTruthy();

    changeInputValue(childDetailPage.childDetailDisplayFirstName, 'Another value');

    expect(childDetailPage.saveButton.nativeElement.disabled).toBeFalsy();

    changeInputValue(childDetailPage.childDetailDisplayFirstName, '');

    expect(childDetailPage.saveButton.nativeElement.disabled).toBeTruthy();
  }));

  it(`should save Child (url /child/:id) by ChildService after Save button is clicked 
    and query update Child again`, fakeAsync(() => {

    childServiceSpy.updateChild.and.returnValue(of(null));

    initPageWithTestChild();

    spyOn(testedComponent.childForm, 'reset');

    const updatedFirstName = "UPDATED_FIRST_NAME";
    changeInputValue(childDetailPage.childDetailDisplayFirstName, updatedFirstName);

    const updatedSurname = "UPDATED_SURNAME_NAME";
    changeInputValue(childDetailPage.childDetailDisplaySurname, updatedSurname);

    spyOn(utility, "fromDateToEnGBString").and.callFake((dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-GB");
    });
    const updatedDateOfBirth = "31/12/2018";
    changeInputValue(childDetailPage.childDetailDisplayDateOfBirth, utility.fromEnGbBStringToDate(updatedDateOfBirth).toString());

    childServiceSpy.getChildById.calls.reset();

    childDetailPage.saveButton.nativeElement.click();

    expect(testChild.firstName).toBe(updatedFirstName);
    expect(testChild.surname).toBe(updatedSurname);
    expect(testChild.dateOfBirth).toBe(updatedDateOfBirth);
    expect(childServiceSpy.updateChild).toHaveBeenCalledWith(testChild);
    expect(testedComponent.childForm.reset).toHaveBeenCalled();
    expect(childServiceSpy.getChildById).toHaveBeenCalledWith(testChild.id);
  }));

  it('should display the error message when updating Child failed', fakeAsync(() => {

    var error: Error = new Error("An error has happened");

    childServiceSpy.updateChild.and.returnValue(Observable.throw(error));

    initPageWithTestChild();

    const updateFirstName = 'UPDATED_FIRST_NAME';
    changeInputValue(childDetailPage.childDetailDisplayFirstName, updateFirstName);

    childDetailPage.saveButton.nativeElement.click();

    fixture.detectChanges();
    childDetailPage.initPage();

    expect(childDetailPage.errorMessageDisplay.nativeElement.textContent).toBe(error.message);

    expect(childDetailPage.childDetailDisplay).toBeNull();
  }));

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

  function initPageWithTestChild() {

    childServiceSpy.getChildById.and.returnValue(of(testChild));

    fixture.detectChanges();
    tick();
    childDetailPage.initPage();
  }

  function expectFormGroupToHasErrorForEmptyInput(formGroup: DebugElement, input: DebugElement) {

    expect(formGroup.classes['has-error']).toBeFalsy();

    changeInputValue(input, '');

    expect(formGroup.classes['has-error']).toBeTruthy();
  }

  function changeInputValue(input: DebugElement, value: string) {

    input.nativeElement.value = value;
    input.triggerEventHandler('input', {'target': input.nativeElement});

    fixture.detectChanges();
  }
});