import { NgModule } from "@angular/core";
import { NgxBootstrapModule } from "../../ngx-bootstrap";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { ConfirmationDialogService } from "./confirmation-dialog.service";

@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  exports: [
    ConfirmationDialogComponent
  ],
  imports: [
    NgxBootstrapModule
  ],
  providers: [
    ConfirmationDialogService
  ]
})
export class ConfirmationDialogModule { }
