import { Component, Input } from "@angular/core";
import { DailyAttendance } from "../domain";

@Component({
  selector: "app-daily-attendance",
  templateUrl: "./daily-attendance.component.html"
})
export class DailyAttendanceComponent {
  @Input()
  public day: string;
  @Input()
  public attendance: DailyAttendance;
}
