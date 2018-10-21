import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

@Directive({
  selector: "[appValidTimeRange]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TimeRangeValidatorDirectiveStub,
      multi: true
    }
  ]
})
// tslint:disable-next-line:directive-class-suffix
export class TimeRangeValidatorDirectiveStub implements Validator {
  public validationErrors: ValidationErrors;
  public validate(control: AbstractControl): ValidationErrors {
    return this.validationErrors;
  }
}
