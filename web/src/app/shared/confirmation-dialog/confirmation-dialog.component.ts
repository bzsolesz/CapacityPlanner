import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  templateUrl: "./confirmation-dialog.component.html"
})
export class ConfirmationDialogComponent {
  public message: string;
  public isConfirmed: boolean = false;

  constructor (private bsModalRef: BsModalRef) {}

  public confirm(isConfirmed: boolean): void {
    this.isConfirmed = isConfirmed;
    this.bsModalRef.hide();
  }
}
