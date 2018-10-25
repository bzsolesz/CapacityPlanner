import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import * as dateUtil from "../../shared/date";
import { defaultDatePickerConfig, DatePickerDirectiveStub } from "../../ngx-bootstrap";
import { ChildDetailComponent } from "./child-detail.component";
import { ChildDetailPageAction } from "./child-detail-page-action";
import { ChildService, Child, AddedChild, defaultWeeklyAttendance, defaultDailyAttendance } from "../domain";
import { ActivatedRouteStub } from "../../test-utils";
import { ConfirmationDialogService, ConfirmationDialogServiceStub } from "../../shared/confirmation-dialog";
import { DailyAttendanceComponentStub } from "../daily-attendance/daily-attendance.component.stub";
import { TimeRangeValidatorDirectiveStub } from "../daily-attendance/time-range.validator.directive.stub";

describe("Child-Detail Component", () => {
  let fixture: ComponentFixture<ChildDetailComponent>;
  let testedComponent: ChildDetailComponent;
  let routerSpy: RouterSpy;
  let activatedRouteStub: ActivatedRouteStub;
  let childServiceSpy: ChildServiceSpy;
  let childDetailPage: ChildDetailPage;
  let testChild: Child;
  let confirmationDialogSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChildDetailComponent,
        DatePickerDirectiveStub,
        DailyAttendanceComponentStub,
        TimeRangeValidatorDirectiveStub
      ],
      imports: [ FormsModule ],
      providers: [
        { provide: Router, useClass: RouterSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: ChildService, useClass: ChildServiceSpy },
        { provide: ConfirmationDialogService, useClass: ConfirmationDialogServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ChildDetailComponent);
    testedComponent = fixture.componentInstance;
    routerSpy = TestBed.get(Router);
    // tslint:disable-next-line: no-any
    activatedRouteStub = fixture.debugElement.injector.get(ActivatedRoute) as any;
    // tslint:disable-next-line: no-any
    childServiceSpy = fixture.debugElement.injector.get(ChildService) as any;
    confirmationDialogSpy = spyOn(TestBed.get(ConfirmationDialogService), "showModal");
    childDetailPage = new ChildDetailPage(fixture);

    initTestChild();

    activatedRouteStub.testParamMap = {id: testChild.id};
    activatedRouteStub.testData = {pageAction: ChildDetailPageAction.VIEW};
  });

  it(`should get Child details by id (from url /child/:id) at initialization from ChildService
    and display it on the page`, fakeAsync(() => {
    childServiceSpy.getChildById.and.returnValue(of(testChild));

    fixture.detectChanges();
    tick();
    childDetailPage.initPage();
    fixture.detectChanges();
    tick();

    expect(childDetailPage.childDetailDisplayFirstName.nativeElement.value).toBe(testChild.firstName);
    expect(childDetailPage.childDetailDisplaySurname.nativeElement.value).toBe(testChild.surname);
    expect(childDetailPage.childDetailDisplayDateOfBirth.nativeElement.value).toEqual(
      dateUtil.fromEnGbBStringToDate(testChild.dateOfBirth).toString());
    expect(childDetailPage.errorMessageDisplay).toBeNull();
    expect(childDetailPage.mondayAttendance.nativeElement.textContent).toEqual("08:30-18:30");
    expect(childDetailPage.tuesdayAttendance.nativeElement.textContent).toEqual("09:00-18:30");
    expect(childDetailPage.wednesdayAttendance.nativeElement.textContent).toEqual("09:30-18:30");
    expect(childDetailPage.thursdayAttendance.nativeElement.textContent).toEqual("08:30-18:00");
    expect(childDetailPage.fridayAttendance.nativeElement.textContent).toEqual("08:30-17:30");
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

  [
    "monday", "tuesday", "wednesday", "thursday", "friday"
  ].forEach((day: string) =>
    it(`should highlight error if ${day} attendance is not valid`, fakeAsync(() => {
      initPageWithTestChild();

      const attendanceFromGroup: DebugElement = childDetailPage[`${day}AttendanceFormGroup`];
      const attendanceTag: DebugElement = childDetailPage[`${day}Attendance`];
      const validatorStub: TimeRangeValidatorDirectiveStub = attendanceTag.injector.get(TimeRangeValidatorDirectiveStub);

      expectAttendanceFromGroupToHasErrorForFailingValidation(attendanceFromGroup, attendanceTag, validatorStub);
    })));

  it("should set default config for the date of birth datepicker", fakeAsync(() => {
    initPageWithTestChild();

    const datePicker: DatePickerDirectiveStub =
      childDetailPage.childDetailDisplayDateOfBirth.injector.get(DatePickerDirectiveStub);
    expect(datePicker.bsConfig).toBe(defaultDatePickerConfig);
  }));

  it("should have the Save button disabled if the form is invalid or pristine (not dirty)", fakeAsync(() => {
    initPageWithTestChild();

    expect(childDetailPage.saveButton.nativeElement.disabled).toBeTruthy();

    changeInputValue(childDetailPage.childDetailDisplayFirstName, "Another value");

    expect(childDetailPage.saveButton.nativeElement.disabled).toBeFalsy();

    changeInputValue(childDetailPage.childDetailDisplayFirstName, "");

    expect(childDetailPage.saveButton.nativeElement.disabled).toBeTruthy();
  }));

  it("should make empty form input fields invalid only if they are dirty as well", fakeAsync(() => {
    activatedRouteStub.testData = {pageAction: ChildDetailPageAction.ADD};
    initPage();

    expectFormGroupNotToHaveErrorForEmptyPristineInput(
      childDetailPage.childDetailDisplayFirstNameFormGroup, childDetailPage.childDetailDisplayFirstName);
    expectFormGroupNotToHaveErrorForEmptyPristineInput(
      childDetailPage.childDetailDisplaySurnameFormGroup, childDetailPage.childDetailDisplaySurname);
    expectFormGroupNotToHaveErrorForEmptyPristineInput(
      childDetailPage.childDetailDisplayDateOfBirthFormGroup, childDetailPage.childDetailDisplayDateOfBirth);

    expectFormGroupToHasErrorForEmptyInput(
      childDetailPage.childDetailDisplayFirstNameFormGroup, childDetailPage.childDetailDisplayFirstName);
    expectFormGroupToHasErrorForEmptyInput(
      childDetailPage.childDetailDisplaySurnameFormGroup, childDetailPage.childDetailDisplaySurname);
    expectFormGroupToHasErrorForEmptyInput(
      childDetailPage.childDetailDisplayDateOfBirthFormGroup, childDetailPage.childDetailDisplayDateOfBirth);
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

    const updatedDateOfBirth: string = "31/12/2018";
    changeDateOfBirthInputValue(updatedDateOfBirth);

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

    changeInputValue(childDetailPage.childDetailDisplayFirstName, "UPDATED_FIRST_NAME");

    childDetailPage.saveButton.nativeElement.click();

    fixture.detectChanges();
    childDetailPage.initPage();

    expect(childDetailPage.errorMessageDisplay.nativeElement.textContent).toBe(error.message);
    expect(childDetailPage.childDetailDisplay).toBeNull();
  }));

  it(`should add Child (post /child) by ChildService after Save button is clicked
  and query update Child again`, fakeAsync(() => {
    const addedChild: AddedChild = {id: 999};
    childServiceSpy.addChild.and.returnValue(of(addedChild));
    childServiceSpy.getChildById.and.returnValue(of(testChild));

    activatedRouteStub.testData = {pageAction: ChildDetailPageAction.ADD};
    initPage();

    spyOn(testedComponent.childForm, "reset");

    const updatedFirstName: string = "UPDATED_FIRST_NAME";
    changeInputValue(childDetailPage.childDetailDisplayFirstName, updatedFirstName);

    const updatedSurname: string = "UPDATED_SURNAME_NAME";
    changeInputValue(childDetailPage.childDetailDisplaySurname, updatedSurname);

    const updatedDateOfBirth: string = "31/12/2018";
    changeDateOfBirthInputValue(updatedDateOfBirth);

    childServiceSpy.getChildById.calls.reset();

    childDetailPage.saveButton.nativeElement.click();

    expect(childServiceSpy.addChild).toHaveBeenCalledWith({
      id: undefined,
      firstName: updatedFirstName,
      surname: updatedSurname,
      dateOfBirth: updatedDateOfBirth,
      attendance: {id: undefined}}
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/child", addedChild.id]);
  }));

  it("should display the error message when adding Child failed", fakeAsync(() => {
    const error: Error = new Error("An error has happened");
    childServiceSpy.addChild.and.returnValue(Observable.throw(error));

    activatedRouteStub.testData = {pageAction: ChildDetailPageAction.ADD};
    initPage();

    changeInputValue(childDetailPage.childDetailDisplayFirstName, "UPDATED_FIRST_NAME");
    changeInputValue(childDetailPage.childDetailDisplaySurname, "UPDATED_SURNAME_NAME");
    changeDateOfBirthInputValue("31/12/2018");

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

  it("should not display delete button on the Add Child page", fakeAsync(() => {
    activatedRouteStub.testData = {pageAction: ChildDetailPageAction.ADD};
    initPage();

    expect(childDetailPage.deleteButton).toBeNull();
  }));

  it("should display delete button on the View Child page", fakeAsync(() => {
    initPageWithTestChild();

    expect(childDetailPage.deleteButton).not.toBeNull();
    expect(childDetailPage.deleteButton.nativeElement.textContent.trim()).toEqual("Delete");
  }));

  it("should Delete the Child if the user confirmed it and return to the Child List page", fakeAsync(() => {
    confirmationDialogSpy.and.returnValue(of(true));
    childServiceSpy.deleteChild.and.returnValue(of(undefined));

    initPageWithTestChild();

    childDetailPage.deleteButton.nativeElement.click();

    expect(confirmationDialogSpy).toHaveBeenCalledWith("Are you sure you want to delete this child?");
    expect(childServiceSpy.deleteChild).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/child/all"]);
  }));

  it("shoud not Delete the Child if the user does not confirm it", fakeAsync(() => {
    confirmationDialogSpy.and.returnValue(of(false));

    initPageWithTestChild();

    childDetailPage.deleteButton.nativeElement.click();

    expect(childServiceSpy.deleteChild).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));

  it("should display the error message when deleting a Child failed", fakeAsync(() => {
    const error: Error = new Error("An error has happened");
    childServiceSpy.deleteChild.and.returnValue(Observable.throw(error));
    confirmationDialogSpy.and.returnValue(of(true));

    initPageWithTestChild();

    childDetailPage.deleteButton.nativeElement.click();

    fixture.detectChanges();
    childDetailPage.initPage();

    expect(childDetailPage.errorMessageDisplay.nativeElement.textContent).toBe(error.message);
    expect(childDetailPage.childDetailDisplay).toBeNull();
  }));

  function initTestChild(): void {
    testChild = {
      id: 999,
      firstName: "FIRST_NAME",
      surname: "SURNAME",
      dateOfBirth: "10/12/2017",
      attendance: defaultWeeklyAttendance()
    };
  }

  function initPageWithTestChild(): void {
    childServiceSpy.getChildById.and.returnValue(of(testChild));
    initPage();
  }

  function initPage(): void {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    childDetailPage.initPage();
  }

  function expectFormGroupNotToHaveErrorForEmptyPristineInput(formGroup: DebugElement, input: DebugElement): void {
    expect(input.nativeElement.value).toEqual("");
    expect(formGroup.classes["has-error"]).toBeFalsy();

    changeInputValue(input, "Some value");

    expect(formGroup.classes["has-error"]).toBeFalsy();
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

  function changeDateOfBirthInputValue(value: string): void {
    spyOn(dateUtil, "fromDateToEnGBString").and.callFake((dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-GB");
    });
    changeInputValue(childDetailPage.childDetailDisplayDateOfBirth, dateUtil.fromEnGbBStringToDate(value).toString());
  }

  function expectAttendanceFromGroupToHasErrorForFailingValidation(
      attendanceFromGroup: DebugElement,
      attendanceTag: DebugElement,
      validator: TimeRangeValidatorDirectiveStub): void {

    expect(attendanceFromGroup.classes["has-error"]).toBeFalsy();

    validator.validationErrors = {errors: {}};
    attendanceTag.componentInstance.emitChange(defaultDailyAttendance());

    fixture.detectChanges();

    expect(attendanceFromGroup.classes["has-error"]).toBeTruthy();
  }
});

class ChildDetailPage {
  constructor (private fixture: ComponentFixture<ChildDetailComponent>) {}

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
  public deleteButton: DebugElement;
  public mondayAttendance: DebugElement;
  public tuesdayAttendance: DebugElement;
  public wednesdayAttendance: DebugElement;
  public thursdayAttendance: DebugElement;
  public fridayAttendance: DebugElement;
  public mondayAttendanceFormGroup: DebugElement;
  public tuesdayAttendanceFormGroup: DebugElement;
  public wednesdayAttendanceFormGroup: DebugElement;
  public thursdayAttendanceFormGroup: DebugElement;
  public fridayAttendanceFormGroup: DebugElement;

  public initPage(): void {
    this.errorMessageDisplay = this.fixture.debugElement.query(By.css("#errorMessageDisplay"));
    this.childDetailDisplay = this.fixture.debugElement.query(By.css("#childDetailDisplay"));
    this.goToChildrenPageButton = this.fixture.debugElement.query(By.css("#goToChildrenPageButton"));

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
      this.deleteButton = this.childDetailDisplay.query(By.css("#deleteButton"));
      this.mondayAttendance = this.childDetailDisplay.query(By.css(".mondayAttendance"));
      this.tuesdayAttendance = this.childDetailDisplay.query(By.css(".tuesdayAttendance"));
      this.wednesdayAttendance = this.childDetailDisplay.query(By.css(".wednesdayAttendance"));
      this.thursdayAttendance = this.childDetailDisplay.query(By.css(".thursdayAttendance"));
      this.fridayAttendance = this.childDetailDisplay.query(By.css(".fridayAttendance"));
      this.mondayAttendanceFormGroup = this.childDetailDisplay.query(By.css("#mondayAttendanceFormGroup"));
      this.tuesdayAttendanceFormGroup = this.childDetailDisplay.query(By.css("#tuesdayAttendanceFormGroup"));
      this.wednesdayAttendanceFormGroup = this.childDetailDisplay.query(By.css("#wednesdayAttendanceFormGroup"));
      this.thursdayAttendanceFormGroup = this.childDetailDisplay.query(By.css("#thursdayAttendanceFormGroup"));
      this.fridayAttendanceFormGroup = this.childDetailDisplay.query(By.css("#fridayAttendanceFormGroup"));
    }
  }
}

class RouterSpy {
  public navigate: jasmine.Spy = jasmine.createSpy("navigate");
}

class ChildServiceSpy {
  public getChildById: jasmine.Spy = jasmine.createSpy("getChildById");
  public updateChild: jasmine.Spy = jasmine.createSpy("updateChild");
  public addChild: jasmine.Spy = jasmine.createSpy("addChild");
  public deleteChild: jasmine.Spy = jasmine.createSpy("deleteChild");
}
