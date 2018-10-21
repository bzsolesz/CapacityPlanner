import { DailyAttendance, defaultDailyAttendance } from "../domain";
import { TestBed, fakeAsync } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { DailyAttendanceComponent } from "./daily-attendance.component";
import { CommonTestSteps } from "../../test-utils";
import { FormsModule } from "@angular/forms";

describe("Daily Attendance Component", () => {
  let steps: Steps;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DailyAttendanceComponent
      ],
      imports: [
        FormsModule
      ]
    });
    steps = new Steps(TestBed.createComponent(DailyAttendanceComponent));
  });

  it("should render an html select with predefined times for 'from'", () => {
    steps.whenDetectChanges();
    steps.thenTimeSelectIsWithPredefinedTimes(FROM);
  });

  it("should render an html select with predefined times for 'to'", () => {
    steps.whenDetectChanges();
    steps.thenTimeSelectIsWithPredefinedTimes(TO);
  });

  it("should display the attendance (from/to) passed in by its host form", fakeAsync(() => {
    steps.givenDailyAttendance();
    steps.whenDetectChangesAndTick();
    steps.thenAttendanceIsDisplayed(FROM, "08:30");
    steps.thenAttendanceIsDisplayed(TO, "18:30");
  }));

  it("should display no-selection if the passed in attendance is undefined", fakeAsync(() => {
    steps.givenNoDailyAttendance();
    steps.whenDetectChangesAndTick();
    steps.thenAttendanceIsNotSelected(FROM);
    steps.thenAttendanceIsNotSelected(TO);
  }));

  it("should emit the new 'from' selected attendance to its host form", fakeAsync(() => {
    steps.givenDailyAttendance();
    steps.givenAHostWaitingForNewAttendanceSelection();
    steps.whenDetectChangesAndTick();
    steps.whenNewAttendanceIsSelected(FROM, "12:00");
    steps.thenFromAttendanceSelectionIsEmmited("12:00", defaultDailyAttendance().to);
  }));

  it("should emit the new 'to' selected attendance to its host form", fakeAsync(() => {
    steps.givenDailyAttendance();
    steps.givenAHostWaitingForNewAttendanceSelection();
    steps.whenDetectChangesAndTick();
    steps.whenNewAttendanceIsSelected(TO, "17:30");
    steps.thenFromAttendanceSelectionIsEmmited(defaultDailyAttendance().from, "17:30");
  }));

  it("should emit undefined attendance to its host form if no 'from' and 'to' is selected", fakeAsync(() => {
    steps.givenDailyAttendance();
    steps.givenAHostWaitingForNewAttendanceSelection();
    steps.whenDetectChangesAndTick();
    steps.whenDeselectAttendance(FROM);
    steps.whenDeselectAttendance(TO);
    steps.thenAttendanceIsUndefined();
  }));

  it("should set component touched when 'from' select losses focus", () => {
    steps.givenDailyAttendance();
    steps.givenAHostWaitingForComponentToBeTouched();
    steps.whenDetectChanges();
    steps.whenSelectLosesFocus(FROM);
    steps.thenComponentIsTouched();
  });

  it("should set component touched when 'to' select losses focus", () => {
    steps.givenDailyAttendance();
    steps.givenAHostWaitingForComponentToBeTouched();
    steps.whenDetectChanges();
    steps.whenSelectLosesFocus(TO);
    steps.thenComponentIsTouched();
  });
});

class Steps extends CommonTestSteps<DailyAttendanceComponent> {
  private host: HostStub;
  public givenDailyAttendance(): void {
    this.component.writeValue(defaultDailyAttendance());
  }

  public givenNoDailyAttendance(): void {
    this.component.writeValue(undefined);
  }

  public givenAHostWaitingForNewAttendanceSelection(): void {
    this.host = new HostStub();
    this.component.registerOnChange(this.host.createOnChange());
  }

  public givenAHostWaitingForComponentToBeTouched(): void {
    this.host = new HostStub();
    this.component.registerOnTouched(this.host.createOnTouched());
  }

  public whenNewAttendanceIsSelected(selectType: SelectType, from: string): void {
    this.whenNewTimeIsSelected(selectType, from);
  }

  public whenDeselectAttendance(selectType: SelectType): void {
    this.whenNewTimeIsSelected(selectType, this.component.NOT_SET_CHAR);
  }

  public whenSelectLosesFocus(selectType: SelectType): void {
    const optionsCss: string = selectType === FROM ? Page.FROM_SELECT : Page.TO_SELECT;
    this.debugElementByCss(optionsCss).triggerEventHandler("blur", {});
  }

  public thenFromAttendanceSelectionIsEmmited(from: string, to: string): void {
    expect(this.host.dailyAttendance).toEqual({from: from, to: to});
  }

  public thenAttendanceIsUndefined(): void {
    expect(this.host.dailyAttendance).toBeUndefined();
  }

  public thenComponentIsTouched(): void {
    expect(this.host.touched).toBeTruthy();
  }

  public thenAttendanceIsDisplayed(selectType: SelectType, expectedSelected: string): void {
    const optionsCss: string = selectType === FROM ? Page.FROM_SELECT_OPTIONS : Page.TO_SELECT_OPTIONS;
    const index: number = this.component.TIMES.indexOf(expectedSelected) + 1;
    const option: DebugElement = this.debugElementsByCss(optionsCss)[index];
    expect(option.nativeElement.selected).toBeTruthy();
    expect(option.nativeElement.textContent).toEqual(expectedSelected);
  }

  public thenAttendanceIsNotSelected(selectType: SelectType): void {
    const optionsCss: string = selectType === FROM ? Page.FROM_SELECT_OPTIONS : Page.TO_SELECT_OPTIONS;
    const option: DebugElement = this.debugElementsByCss(optionsCss)[0];
    expect(option.nativeElement.selected).toBeTruthy();
    expect(option.nativeElement.value).toEqual(this.component.NOT_SET_CHAR);
    expect(option.nativeElement.textContent).toEqual("");
  }

  public thenTimeSelectIsWithPredefinedTimes(selectType: SelectType): void {
    const optionsCss: string = selectType === FROM ? Page.FROM_SELECT_OPTIONS : Page.TO_SELECT_OPTIONS;
    const options: DebugElement[] = this.debugElementsByCss(optionsCss);
    expect(options.length).toEqual(this.component.TIMES.length + 1);
    expect(options[0].nativeElement.value).toEqual(this.component.NOT_SET_CHAR);
    expect(options[0].nativeElement.textContent).toEqual("");
    this.component.TIMES.forEach((time: string, index: number) => {
      expect(options[index + 1].nativeElement.value).toEqual(time);
      expect(options[index + 1].nativeElement.textContent).toEqual(time);
    });
  }

  private whenNewTimeIsSelected(selectType: SelectType, selected: string): void {
    const optionsCss: string = selectType === FROM ? Page.FROM_SELECT : Page.TO_SELECT;
    // tslint:disable-next-line:no-any
    const fromSelect: any = this.nativeElementByCss(optionsCss);
    fromSelect.value = selected;
    fromSelect.dispatchEvent(new Event("change"));
  }
}

class Page {
  public static readonly FROM_SELECT: string = ".dailyAttendanceFromSelect";
  public static readonly TO_SELECT: string = ".dailyAttendanceToSelect";
  public static readonly FROM_SELECT_OPTIONS: string = ".dailyAttendanceFromSelect option";
  public static readonly TO_SELECT_OPTIONS: string = ".dailyAttendanceToSelect option";
}

enum SelectType {
  FROM = "FROM",
  TO = "TO"
}

const FROM: SelectType = SelectType.FROM;
const TO: SelectType = SelectType.TO;

class HostStub {
  public dailyAttendance: DailyAttendance = defaultDailyAttendance();
  public touched: boolean = false;

  public createOnChange(): (dailyAttendance: DailyAttendance) => void {
    const _this: HostStub = this;
    return (changedAttendance: DailyAttendance): void => {
      _this.dailyAttendance = changedAttendance;
    };
  }

  public createOnTouched(): () => void {
    const _this: HostStub = this;
    return (): void => {
      _this.touched = true;
    };
  }
}
