import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxBootstrapModule } from "../ngx-bootstrap";
import { ChildRoutingModule } from "./child-routing.module";
import { ConfirmationDialogModule } from "../shared/confirmation-dialog";
import { ChildDetailComponent } from "./child-detail/child-detail.component";
import { ChildListComponent } from "./child-list/child-list.component";
import { ChildService } from "./domain";
import { WeeklyAttendanceComponent } from "./weekly-attendance/weekly-attendance.component";
import { DailyAttendanceComponent } from "./daily-attendance/daily-attendance.component";

@NgModule({
  declarations: [
    ChildDetailComponent,
    ChildListComponent,
    WeeklyAttendanceComponent,
    DailyAttendanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxBootstrapModule,
    ChildRoutingModule,
    ConfirmationDialogModule
  ],
  providers: [
    ChildService
  ]
})
export class ChildModule {}
