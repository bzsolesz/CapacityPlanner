import { ComponentFixture, TestBed, async, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement, Directive, Input } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from "@angular/router";
import { FormsModule } from "@angular/forms";

import * as utility from "../../utility";
import { defaultDatePickerConfig } from "../../ngx-bootstrap";

import { ChildDetailComponent } from "./child-detail.component";
import { ChildService } from "../domain/child.service";
import { Child } from "../domain/child";

describe("Child-Detail Component", () => {

  let fixture: ComponentFixture<ChildDetailComponent>;
  let testedComponent: ChildDetailComponent;

  class RouterSpy {
    public navigate: jasmine.Spy = jasmine.createSpy("navigate");
  }

  class ActivatedRouteStub {
    private _testParamMap: ParamMap;
    private subject: BehaviorSubject<ParamMap> = new BehaviorSubject(this._testParamMap);

    public paramMap: Observable<ParamMap> = this.subject.asObservable();

    set testParamMap(params: {}) {
      this._testParamMap = convertToParamMap(params);
      this.subject.next(this._testParamMap);
    }
  }

  @Directive({
    // tslint:disable-next-line: directive-selector
    selector: "[bsDatepicker]"
  })
  class DatePickerStubDirective {
    @Input()
    public bsConfig: object;
  }

  class ChildServiceSpy {
    public getChildById: jasmine.Spy = jasmine.createSpy("getChildById");
    public updateChild: jasmine.Spy = jasmine.createSpy("updateChild");
  }

  class ChildDetailPage {

    public childDetailDisplay: DebugElement;
    public childDetailDisplayId: DebugElement;
    public childDetailDisplayFirstName: DebugElement;
    public childDetailDisplaySurname: DebugElement;
    public childDetailDisplayDateOfBirth: DebugElement;

    public childDetailDisplayFirstNameFormGroup: DebugElement;
    public childDetailDisplaySurnameFormGroup: DebugElement;
    public childDetailDisplayDateOfBirthFormGroup: DebugElement;

    public childDetailForm: DebugElement;
    public errorMessageDisplay: DebugElement;
    public goToChildrenPageButton: DebugElement;
    public saveButton: DebugElement;

    public initPage(): void {
      this.errorMessageDisplay = fixture.debugElement.query(By.css("#errorMessageDisplay"));
      this.childDetailDisplay = fixture.debugElement.query(By.css("#childDetailDisplay"));
      this.goToChildrenPageButton = fixture.debugElement.query(By.css("#goToChildrenPageButton"));

      if (this.childDetailDisplay !== null) {

        this.childDetailDisplayId = this.childDetailDisplay.query(By.css("#id"));
        this.childDetailDisplayFirstName = this.childDetailDisplay.query(By.css("#firstName"));
        this.childDetailDisplaySurname = this.childDetailDisplay.query(By.css("#surname"));
        this.childDetailDisplayDateOfBirth = this.childDetailDisplay.query(By.css("#dateOfBirth"));

        this.childDetailDisplayFirstNameFormGroup = this.childDetailDisplay.query(By.css("#firstNameFormGroup"));
        this.childDetailDisplaySurnameFormGroup = this.childDetailDisplay.query(By.css("#surnameFormGroup"));
        this.childDetailDisplayDateOfBirthFormGroup = this.childDetailDisplay.query(By.css("#dateOfBirthFormGroup"));

        this.childDetailForm = this.childDetailDisplay.query(By.css("form"));
        this.saveButton = this.childDetailDisplay.query(By.css("#saveButton"));
      }
    }
  }

  let routerSpy: RouterSpy;
  let activatedRouteStub: ActivatedRouteStub;
  let childServiceSpy: ChildServiceSpy;
  let childDetailPage: ChildDetailPage;
  let testChild: Child;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ChildDetailComponent, DatePickerStubDirective ],
      imports: [ FormsModule ],
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
    // tslint:disable-next-line: no-any
    activatedRouteStub = fixture.debugElement.injector.get(ActivatedRoute) as any;
    // tslint:disable-next-line: no-any
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

    expect(childDetailPage.childDetailDisplayFirstName.nativeElement.value).toBe(testChild.firstName);
    expect(childDetailPage.childDetailDisplaySurname.nativeElement.value).toBe(testChild.surname);
    expect(childDetailPage.childDetailDisplayDateOfBirth.nativeElement.value).toEqual(
      utility.fromEnGbBStringToDate(testChild.dateOfBirth).toString());

    expect(childDetailPage.errorMessageDisplay).toBeNull();
  }));

  it("should display the error message when query for child by id failed", () => {

    const error: Error = new Error("An error has happened");

    childServiceSpy.getChildById.and.returnValue(Observable.throw(error));

    fixture.detectChanges();
    childDetailPage.initPage();

    expect(childDetailPage.errorMessageDisplay.nativeElement.textContent).toBe(error.message);

    expect(childDetailPage.childDetailDisplay).toBeNull();
  });

  it("should have the First Name field required", fakeAsync(() => {

    initPageWithTestChild();

    expectFormGroupToHasErrorForEmptyInput(
      childDetailPage.childDetailDisplayFirstNameFormGroup, childDetailPage.childDetailDisplayFirstName);
  }));

  it("should have the Surname field required", fakeAsync(() => {

    initPageWithTestChild();

    expectFormGroupToHasErrorForEmptyInput(
      childDetailPage.childDetailDisplaySurnameFormGroup, childDetailPage.childDetailDisplaySurname);
  }));

  it("should have the Date of Birth field required", fakeAsync(() => {

    initPageWithTestChild();

    expectFormGroupToHasErrorForEmptyInput(
      childDetailPage.childDetailDisplayDateOfBirthFormGroup, childDetailPage.childDetailDisplayDateOfBirth);
  }));

  it("should set default config for the date of birth datepicker", fakeAsync(() => {
    initPageWithTestChild();

    expect(childDetailPage.childDetailDisplayDateOfBirth.injector.get(DatePickerStubDirective).bsConfig).toBe(defaultDatePickerConfig);
  }));

  it("should have the Save button disabled if the form is invalid or pristine (not dirty)", fakeAsync(() => {

    initPageWithTestChild();

    expect(childDetailPage.saveButton.nativeElement.disabled).toBeTruthy();

    changeInputValue(childDetailPage.childDetailDisplayFirstName, "Another value");

    expect(childDetailPage.saveButton.nativeElement.disabled).toBeFalsy();

    changeInputValue(childDetailPage.childDetailDisplayFirstName, "");

    expect(childDetailPage.saveButton.nativeElement.disabled).toBeTruthy();
  }));

  it(`should save Child (url /child/:id) by ChildService after Save button is clicked
    and query update Child again`, fakeAsync(() => {

    childServiceSpy.updateChild.and.returnValue(of(null));

    initPageWithTestChild();

    spyOn(testedComponent.childForm, "reset");

    const updatedFirstName: string = "UPDATED_FIRST_NAME";
    changeInputValue(childDetailPage.childDetailDisplayFirstName, updatedFirstName);

    const updatedSurname: string = "UPDATED_SURNAME_NAME";
    changeInputValue(childDetailPage.childDetailDisplaySurname, updatedSurname);

    spyOn(utility, "fromDateToEnGBString").and.callFake((dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-GB");
    });
    const updatedDateOfBirth: string = "31/12/2018";
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

  it("should display the error message when updating Child failed", fakeAsync(() => {

    const error: Error = new Error("An error has happened");

    childServiceSpy.updateChild.and.returnValue(Observable.throw(error));

    initPageWithTestChild();

    const updateFirstName: string = "UPDATED_FIRST_NAME";
    changeInputValue(childDetailPage.childDetailDisplayFirstName, updateFirstName);

    childDetailPage.saveButton.nativeElement.click();

    fixture.detectChanges();
    childDetailPage.initPage();

    expect(childDetailPage.errorMessageDisplay.nativeElement.textContent).toBe(error.message);

    expect(childDetailPage.childDetailDisplay).toBeNull();
  }));

  it("should have a button for navigating to the Children page", () => {

    childServiceSpy.getChildById.and.returnValue(of(testChild));

    fixture.detectChanges();
    childDetailPage.initPage();

    childDetailPage.goToChildrenPageButton.triggerEventHandler("click", null);

    expect(routerSpy.navigate).toHaveBeenCalledWith(["/child/all"]);
  });

  function initTestChild(): void {
    testChild = new Child(999, "FIRST_NAME", "SURNAME", "10/12/2017");
  }

  function initPageWithTestChild(): void {

    childServiceSpy.getChildById.and.returnValue(of(testChild));

    fixture.detectChanges();
    tick();
    childDetailPage.initPage();
  }

  function expectFormGroupToHasErrorForEmptyInput(formGroup: DebugElement, input: DebugElement): void {

    expect(formGroup.classes["has-error"]).toBeFalsy();

    changeInputValue(input, "");

    expect(formGroup.classes["has-error"]).toBeTruthy();
  }

  function changeInputValue(input: DebugElement, value: string): void {

    input.nativeElement.value = value;
    input.triggerEventHandler("input", {"target": input.nativeElement});

    fixture.detectChanges();
  }
});
