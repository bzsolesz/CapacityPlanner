import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { BsModalRef } from "ngx-bootstrap";
import { BsModalRefStub } from "../../test-utils";

describe("Confirmation-Dialog Component", () => {
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let testedComponent: ConfirmationDialogComponent;
  let steps: Steps;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ],
      providers: [
        {provide: BsModalRef, useClass: BsModalRefStub}
      ]
    });
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    testedComponent = fixture.componentInstance;
    steps = new Steps(fixture);
  });

  it("should display the injected message in its body", () => {
    const message: string = "Are you sure?";
    steps.givenInputMessage(message);

    fixture.detectChanges();

    steps.thenDisplayedModalMessageIs(message);
  });

  it("should not confirm on Cancel button click and close modal window", () => {
    steps.givenModalWindowReference();
    fixture.detectChanges();

    steps.whenCancelButtonIsClicked();

    steps.thenModalShouldBeClosed();
    steps.thenItShouldNotBeConfirmed();
  });

  it("should confirm on Cancel button click and close modal window", () => {
    steps.givenModalWindowReference();
    fixture.detectChanges();

    steps.whenOkButtonIsClicked();

    steps.thenModalShouldBeClosed();
    steps.thenItShouldBeConfirmed();
  });
});

class Steps {
  private modalWindowHideSpy: jasmine.Spy;

  constructor(private fixture: ComponentFixture<ConfirmationDialogComponent>) {}

  public givenInputMessage(message: string): void {
    this.fixture.componentInstance.message = message;
  }

  public givenModalWindowReference(): void {
    this.modalWindowHideSpy = spyOn(TestBed.get(BsModalRef), "hide");
  }

  public whenCancelButtonIsClicked(): void {
    this.fixture.nativeElement.querySelector(Page.cancelButton).click();
  }

  public whenOkButtonIsClicked(): void {
    this.fixture.nativeElement.querySelector(Page.okButton).click();
  }

  public thenDisplayedModalMessageIs(message: string): void {
    expect(this.fixture.nativeElement.querySelector(Page.modalMessage).textContent).toEqual(message);
  }

  public thenModalShouldBeClosed(): void {
    expect(this.modalWindowHideSpy).toHaveBeenCalled();
  }

  public thenItShouldNotBeConfirmed(): void {
    expect(this.fixture.componentInstance.isConfirmed).toBeFalsy();
  }

  public thenItShouldBeConfirmed(): void {
    expect(this.fixture.componentInstance.isConfirmed).toBeTruthy();
  }
}

class Page {
  public static readonly modalMessage: string = "p";
  public static readonly cancelButton: string = "#cancelButton";
  public static readonly okButton: string = "#okButton";
}
