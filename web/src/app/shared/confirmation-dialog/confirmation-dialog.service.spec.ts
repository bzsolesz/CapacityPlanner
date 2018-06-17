import { ConfirmationDialogService } from "./confirmation-dialog.service";
import { ModalOptions } from "ngx-bootstrap";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { fakeAsync, tick } from "@angular/core/testing";

class ModalServiceSpy {
  public show: jasmine.Spy = jasmine.createSpy("show");
  public onHide: Observable<string> = new Observable<string>();
}

describe("Confirmation-Dialog Service", () => {
  let testedService: ConfirmationDialogService;
  const modalServiceSpy: ModalServiceSpy = new ModalServiceSpy();

  beforeEach(() => {
    // tslint:disable-next-line:no-any
    testedService = new ConfirmationDialogService(modalServiceSpy as any);
  });

  it("should show a properly configured confirmation dialog", () => {
    const message: string = "Are you sure?";
    const expectedModalConfiguration: ModalOptions = ConfirmationDialogService.DEFAULT_MODAL_OPTIONS;
    expectedModalConfiguration.initialState = {message};
    testedService.showModal(message);

    expect(modalServiceSpy.show).toHaveBeenCalled();
    expect(modalServiceSpy.show.calls.mostRecent().args[0]).toBe(ConfirmationDialogComponent);
    expect(modalServiceSpy.show.calls.mostRecent().args[1]).toEqual(expectedModalConfiguration);
  });

  it("should emit false when user did not confirmed the message", fakeAsync(() => {
    modalServiceSpy.show.and.returnValue({content: {isConfirmed: false}});
    modalServiceSpy.onHide = of("Hidden");

    let isConfirmed: boolean;
    testedService.showModal("message").subscribe((confirmed: boolean) => isConfirmed = confirmed);

    tick();

    expect(isConfirmed).toBeFalsy();
  }));

  it("should emit true when user confirmation happened", fakeAsync(() => {
    modalServiceSpy.show.and.returnValue({content: {isConfirmed: true}});
    modalServiceSpy.onHide = of("Hidden");

    let isConfirmed: boolean;
    testedService.showModal("message").subscribe((confirmed: boolean) => isConfirmed = confirmed);

    tick();

    expect(isConfirmed).toBeTruthy();
  }));
});
