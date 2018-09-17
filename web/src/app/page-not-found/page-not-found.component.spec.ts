import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found.component";

describe("Page-Not-Found Component", () => {
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let testedComponent: PageNotFoundComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    });
    fixture = TestBed.createComponent(PageNotFoundComponent);
    testedComponent = fixture.componentInstance;
  });

  it("should should display Page Not Found error message", () => {
    fixture.detectChanges();

    const errorMessageDisplay: DebugElement = fixture.debugElement.query(By.css("p"));

    expect(errorMessageDisplay).not.toBeNull();
    expect(errorMessageDisplay.nativeElement.textContent).toBe("Page was not found!");
  });
});
