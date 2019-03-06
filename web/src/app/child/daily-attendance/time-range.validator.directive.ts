import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";
import { DailyAttendance } from "../domain";

@Directive({
  selector: "[appValidTimeRange]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TimeRangeValidatorDirective,
      multi: true
    }
  ]
})
export class TimeRangeValidatorDirective implements Validator {
  public static readonly ID: string = "InvalidTimeRange";

  public validate(control: AbstractControl): ValidationErrors {
    const attendance: DailyAttendance = control.value;
    const isInvalid: boolean =
      attendance && (!attendance.from || !attendance.to || (this.timeToNumber(attendance.from) >= this.timeToNumber(attendance.to)));
    return isInvalid ? this.toValidationErrors() : null;
  }

  private timeToNumber(timeString: string): number {
    const hourAndMinute: string[] = timeString.split(":");
    return Number(hourAndMinute[0]) + (Number(hourAndMinute[1]) / 60);
  }

  private toValidationErrors(): ValidationErrors {
    return {[TimeRangeValidatorDirective.ID]: {}};
  }
}
