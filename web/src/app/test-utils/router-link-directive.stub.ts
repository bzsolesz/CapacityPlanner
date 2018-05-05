import { Directive, Input } from "@angular/core";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[routerLink]"
})
// tslint:disable-next-line: directive-class-suffix
export class RouterLinkDirectiveStub {
  @Input()
  public routerLink: string[];
}
