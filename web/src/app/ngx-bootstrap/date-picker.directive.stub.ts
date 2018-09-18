import { Directive, Input } from "@angular/core";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[bsDatepicker]"
})
// tslint:disable-next-line: directive-class-suffix
export class DatePickerDirectiveStub {
  @Input()
  public bsConfig: object;
}
