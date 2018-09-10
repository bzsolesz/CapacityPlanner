import { ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";

export class CommonStepSteps<T> {
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

  public whenDetectChanges(): void {
    this.fixture.detectChanges();
  }
}
