import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
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
