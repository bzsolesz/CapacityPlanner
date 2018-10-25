import { TimeRangeValidatorDirective } from "./time-range.validator.directive";
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

describe("Time Range Validator Directive", () => {
  let testedDirective: TimeRangeValidatorDirective;
  let controlDummy: AbstractControl;

  beforeEach(() => {
    testedDirective = new TimeRangeValidatorDirective();
    controlDummy = new FormControl();
  });

  it("should accept undefined Daily Attendance as valid", () => {
    controlDummy.setValue(undefined);
    const result: ValidationErrors = testedDirective.validate(controlDummy);
    expectNoValidationError(result);
  });

  it("should return validation error if 'from' is not set", () => {
    controlDummy.setValue({to: "18:30"});
    const result: ValidationErrors = testedDirective.validate(controlDummy);
    expectValidationError(result);
  });

  it("should return validation error if 'to' is not set", () => {
    controlDummy.setValue({from: "08:30"});
    const result: ValidationErrors = testedDirective.validate(controlDummy);
    expectValidationError(result);
  });

  it("should accept Daily Attendance with 'from' and 'to' as valid, if 'from' is less than 'to'", () => {
    controlDummy.setValue({from: "08:30", to: "18:30"});
    const result: ValidationErrors = testedDirective.validate(controlDummy);
    expectNoValidationError(result);
  });

  it("should return validation error if 'from' is equal to 'to'", () => {
    controlDummy.setValue({from: "09:30", to: "09:30"});
    const result: ValidationErrors = testedDirective.validate(controlDummy);
    expectValidationError(result);
  });

  it("should return validation error if 'from' is greater than 'to'", () => {
    controlDummy.setValue({from: "09:30", to: "09:00"});
    const result: ValidationErrors = testedDirective.validate(controlDummy);
    expectValidationError(result);
  });
});

function expectNoValidationError(validationResult: ValidationErrors): void {
  expect(validationResult).toBeNull();
}

function expectValidationError(validationResult: ValidationErrors): void {
  expect(validationResult).not.toBeNull();
  expect(validationResult[TimeRangeValidatorDirective.ID]).not.toBeNull();
}
