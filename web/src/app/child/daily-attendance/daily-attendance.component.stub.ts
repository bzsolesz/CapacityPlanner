import { Component, Input } from "@angular/core";
import { DailyAttendance } from "../domain";

@Component({
  selector: "app-daily-attendance",
  template: "<span>{{day}}-{{attendance.from}}-{{attendance.to}}</span>"
})
// tslint:disable-next-line:component-class-suffix
export class DailyAttendanceComponentStub {
  @Input()
  public day: string;
  @Input()
  public attendance: DailyAttendance;
}
