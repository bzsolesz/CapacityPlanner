import { Component, forwardRef } from "@angular/core";
import { DailyAttendance } from "../domain";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-daily-attendance",
  template: "<span>{{dailyAttendance?.from}}-{{dailyAttendance?.to}}</span>",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DailyAttendanceComponentStub),
      multi: true
    }
  ]
})
// tslint:disable-next-line:component-class-suffix
export class DailyAttendanceComponentStub implements ControlValueAccessor {
  public dailyAttendance: DailyAttendance;

  public writeValue(dailyAttendance: DailyAttendance): void {
    this.dailyAttendance = dailyAttendance;
  }

  public registerOnChange(onChangeFunction: (dailyAttendance: DailyAttendance) => void): void { /**/ }
  public registerOnTouched(onTouchedFunction: () => void): void { /**/ }
}
