import { NgModule } from "@angular/core";
import { NgxBootstrapModule } from "../ngx-bootstrap/ngx-bootstrap.module";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { ConfirmationDialogService } from "./confirmation-dialog/confirmation-dialog.service";

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
export class SharedModule { }
