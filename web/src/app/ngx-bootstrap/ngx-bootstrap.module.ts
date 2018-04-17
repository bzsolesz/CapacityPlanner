import { NgModule } from "@angular/core";

import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";

export const defaultDatePickerConfig: Partial<BsDatepickerConfig> = {
  containerClass: "theme-dark-blue",
  dateInputFormat: "DD/MM/YYYY",
  showWeekNumbers: false
};

@NgModule({
  exports: [
    BsDatepickerModule
  ],
  imports: [
    BsDatepickerModule.forRoot()
  ]
})
export class NgxBootstrapModule { }
