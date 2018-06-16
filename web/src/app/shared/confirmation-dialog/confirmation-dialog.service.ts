import { Injectable } from "@angular/core";
import { BsModalService, ModalOptions, BsModalRef } from "ngx-bootstrap/modal";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { Observable } from "rxjs/Observable";
// TODO move operator additions to a centralized space
import "rxjs/add/operator/first";

@Injectable()
export class ConfirmationDialogService {
  public static readonly DEFAULT_MODAL_OPTIONS: ModalOptions = {
    animated: false,
    backdrop: "static",
    class: "modal-sm",
    keyboard: true
  };

  constructor(private modalService: BsModalService) {}

  public showModal(message: string): Observable<boolean> {
    const modalReference: BsModalRef =
      this.modalService.show(ConfirmationDialogComponent, this.getModalOptions(message));
    return this.modalService.onHide.first().map(() => modalReference.content.isConfirmed);
  }

  private getModalOptions(message: string): ModalOptions {
    return Object.assign({}, ConfirmationDialogService.DEFAULT_MODAL_OPTIONS, {initialState: {message}});
  }
}
