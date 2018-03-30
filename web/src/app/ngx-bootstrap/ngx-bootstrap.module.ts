import { NgModule } from '@angular/core';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

export const defaultDatePickerConfig: Partial<BsDatepickerConfig> = {
  dateInputFormat: "DD/MM/YYYY",
  showWeekNumbers: false
};

@NgModule({
  imports: [
    BsDatepickerModule.forRoot()
  ],
  exports: [
  	BsDatepickerModule
  ]
})
export class NgxBootstrapModule { }
