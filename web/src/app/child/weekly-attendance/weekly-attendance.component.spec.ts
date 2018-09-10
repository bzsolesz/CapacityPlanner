import { TestBed } from "@angular/core/testing";
import { WeeklyAttendanceComponent } from "./weekly-attendance.component";
import { WeeklyAttendance } from "../domain/weekly-attendance";
import { Component } from "@angular/core";
import { CommonStepSteps } from "../../test-utils/common-test-steps";
import { DailyAttendanceComponentStub } from "../daily-attendance/daily-attendance.component.stub";
import { defaultWeeklyAttendance } from "../domain/weekly-attendance.stub";

describe("Weekly Attendance Component", () => {
  let steps: Steps;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostComponentStub,
        WeeklyAttendanceComponent,
        DailyAttendanceComponentStub
      ]
    });
    steps = new Steps(TestBed.createComponent(HostComponentStub));
  });

  it("should render daily attendance for each weekday", () => {
    steps.givenWeeklyAttendance();
    steps.whenDetectChanges();
    steps.thenWeeklyAttendanceIsDisplayed();
  });

  it("should render 'No weekly attendance' message if there is no attendance", () => {
    steps.whenDetectChanges();
    steps.thenNoAttendanceMessageIsDisplayed();
  });
});

class Steps extends CommonStepSteps<HostComponentStub> {
  public givenWeeklyAttendance(): void {
    this.component.attendance = defaultWeeklyAttendance();
  }

  public thenWeeklyAttendanceIsDisplayed(): void {
    expect(this.nativeElementByCss(Page.MONDAY).textContent).toEqual("Monday-08:30-18:30");
    expect(this.nativeElementByCss(Page.TUESDAY).textContent).toEqual("Tuesday-09:00-18:30");
    expect(this.nativeElementByCss(Page.WEDNESDAY).textContent).toEqual("Wednesday-09:30-18:30");
    expect(this.nativeElementByCss(Page.THURSDAY).textContent).toEqual("Thursday-08:30-18:00");
    expect(this.nativeElementByCss(Page.FRIDAY).textContent).toEqual("Friday-08:30-17:30");
  }

  public thenNoAttendanceMessageIsDisplayed(): void {
    expect(this.nativeElementByCss(Page.CONTAINER).textContent.trim())
      .toEqual("No weekly attendance has been set for this child.");
  }
}

class Page {
  public static readonly CONTAINER: string = ".panel-body";
  public static readonly MONDAY: string = "app-daily-attendance:nth-of-type(1)";
  public static readonly TUESDAY: string = "app-daily-attendance:nth-of-type(2)";
  public static readonly WEDNESDAY: string = "app-daily-attendance:nth-of-type(3)";
  public static readonly THURSDAY: string = "app-daily-attendance:nth-of-type(4)";
  public static readonly FRIDAY: string = "app-daily-attendance:nth-of-type(5)";
}

@Component({
  template: "<app-weekly-attendance [attendance]='attendance'></app-weekly-attendance>"
})
// tslint:disable-next-line:component-class-suffix
class HostComponentStub {
  public attendance: WeeklyAttendance;
}
