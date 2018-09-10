import { Component, Input } from "@angular/core";
import { WeeklyAttendance } from "../domain";

@Component({
  selector: "app-weekly-attendance",
  templateUrl: "./weekly-attendance.component.html"
})
export class WeeklyAttendanceComponent {
  @Input()
  public attendance: WeeklyAttendance;
}
