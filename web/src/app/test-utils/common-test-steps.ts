import { ComponentFixture } from "@angular/core/testing";
import { DebugElement, Type } from "@angular/core";
import { By } from "@angular/platform-browser";

export class CommonTestSteps<T> {
  protected component: T;
  protected debugElement: DebugElement;

  constructor(protected fixture: ComponentFixture<T>) {
    this.debugElement = fixture.debugElement;
    this.component = fixture.componentInstance;
  }

  // tslint:disable-next-line:no-any
  protected nativeElementByCss(css: string): any {
    return this.debugElement.nativeElement.querySelector(css);
  }

  // tslint:disable-next-line:no-any
  protected debugElementsByDirective(directive: Type<any>): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.directive(directive));
  }

  public whenDetectChanges(): void {
    this.fixture.detectChanges();
  }
}
