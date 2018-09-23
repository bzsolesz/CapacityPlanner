import { NgModule } from "@angular/core";
import { AttendanceRoutingModule } from "./attendance-routing.module";
import { WeeklyAttendanceChartComponent } from "./weekly-attendance-chart/weekly-attendance-chart.component";

@NgModule({
  declarations: [
    WeeklyAttendanceChartComponent
  ],
  imports: [
    AttendanceRoutingModule
  ]
})
export class AttendanceModule {}
