import { DailyAttendance, defaultDailyAttendance } from "../domain";
import { TestBed } from "@angular/core/testing";
import { DailyAttendanceComponent } from "./daily-attendance.component";
import { Component } from "@angular/core";
import { CommonTestSteps } from "../../test-utils";

describe("Daily Attendance Component", () => {
  let steps: Steps;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostComponentStub,
        DailyAttendanceComponent
      ]
    });
    steps = new Steps(TestBed.createComponent(HostComponentStub));
  });

  it("should render daily attendance", () => {
    steps.givenDailyAttendance();
    steps.whenDetectChanges();
    steps.thenDailyAttendanceIsDisplayed();
  });

  it("should stay empty if there is no daily attendance", () => {
    steps.thenDailyAttendanceIsNotDisplayed();
  });
});

class Steps extends CommonTestSteps<HostComponentStub> {
  public givenDailyAttendance(): void {
    this.component.attendance = defaultDailyAttendance();
  }

  public thenDailyAttendanceIsDisplayed(): void {
    expect(this.nativeElementByCss(Page.DAY).textContent).toEqual("Monday:");
    expect(this.nativeElementByCss(Page.TIME).textContent).toEqual("08:30 - 18:30");
  }

  public thenDailyAttendanceIsNotDisplayed(): void {
    expect(this.nativeElementByCss(Page.CONTAINER)).toBeNull();
  }
}

class Page {
  public static readonly CONTAINER: string = ".dailyAttendance";
  public static readonly DAY: string = ".dailyAttendanceDay";
  public static readonly TIME: string = ".dailyAttendanceTime";
}

@Component({
  template: "<app-daily-attendance day='Monday' [attendance]='attendance'></app-daily-attendance>"
})
// tslint:disable-next-line:component-class-suffix
class HostComponentStub {
  public attendance: DailyAttendance;
}
