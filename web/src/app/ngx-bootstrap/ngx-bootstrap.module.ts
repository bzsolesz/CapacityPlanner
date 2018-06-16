import { NgModule } from "@angular/core";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { ModalModule } from "ngx-bootstrap/modal";

export const defaultDatePickerConfig: Partial<BsDatepickerConfig> = {
  containerClass: "theme-dark-blue",
  dateInputFormat: "DD/MM/YYYY",
  showWeekNumbers: false
};

@NgModule({
  exports: [
    BsDatepickerModule,
    ModalModule
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class NgxBootstrapModule { }
