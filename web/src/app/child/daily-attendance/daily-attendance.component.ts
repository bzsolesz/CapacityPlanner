import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DailyAttendance } from "../domain/daily-attendance";
import { AttendanceTime } from "../../shared/date";

@Component({
  selector: "app-daily-attendance",
  templateUrl: "./daily-attendance.component.html",
  styleUrls: ["daily-attendance.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DailyAttendanceComponent),
      multi: true
    }
  ]
})
export class DailyAttendanceComponent implements ControlValueAccessor {
  public static readonly NOT_SET_VALUE: string = "-";

  public _from: string;
  public _to: string;
  private onTouched: () => void;
  private onChange: (dailyAttendance: DailyAttendance) => void;

  set from(from: string) {
    this._from = this.toModel(from);
    this.onChange(this.toAttendance(this._from, this._to));
  }

  set to(to: string) {
    this._to = this.toModel(to);
    this.onChange(this.toAttendance(this._from, this._to));
  }

  get from(): string {
    return this.toView(this._from);
  }

  get to(): string {
    return this.toView(this._to);
  }

  get times(): string[] {
    return Object.values(AttendanceTime);
  }

  get notSetValue(): string {
    return DailyAttendanceComponent.NOT_SET_VALUE;
  }

  public writeValue(dailyAttendance: DailyAttendance): void {
    if (dailyAttendance) {
      this._from = this.toModel(dailyAttendance.from);
      this._to = this.toModel(dailyAttendance.to);
    } else {
      this._from = undefined;
      this._to = undefined;
    }
  }

  public blur(): void {
    this.onTouched();
  }

  public registerOnChange(onChangeFunction: (dailyAttendance: DailyAttendance) => void): void {
    this.onChange = onChangeFunction;
  }

  public registerOnTouched(onTouchedFunction: () => void): void {
    this.onTouched = onTouchedFunction;
  }

  public delete(): void {
    this._from = this.toModel(this.notSetValue);
    this._to = this.toModel(this.notSetValue);
    this.onChange(this.toAttendance(this._from, this._to));
  }

  private toView(timeModel: string): string {
    return timeModel && this.times.includes(timeModel) ? timeModel : this.notSetValue;
  }

  private toModel(timeString: string): string {
    return timeString && this.times.includes(timeString) ? timeString : undefined;
  }

  private toAttendance(from: string, to: string): DailyAttendance {
    return !from && !to ? undefined : {from: from, to: to};
  }
}
