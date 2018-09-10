import { Component, Input } from "@angular/core";
import { WeeklyAttendance } from "../child/domain";

@Component({
  selector: "app-weekly-attendance",
  template: "<span *ngIf=\"attendance && attendance.monday\">{{attendance.monday.from}}-{{attendance.monday.to}}</span>"
})
// tslint:disable-next-line:component-class-suffix
export class WeeklyAttendanceComponentStub {
  @Input()
  public attendance: WeeklyAttendance;
}
