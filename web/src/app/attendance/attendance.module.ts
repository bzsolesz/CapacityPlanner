import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AttendanceRoutingModule } from "./attendance-routing.module";
import { WeeklyAttendanceChartComponent } from "./weekly-attendance-chart/weekly-attendance-chart.component";
import { GoogleTimelineChartComponent } from "./weekly-attendance-chart/charts/google-timeline-chart/google-timeline-chart.component";
import { Ng2GoogleChartsModule } from "ng2-google-charts";

@NgModule({
  declarations: [
    WeeklyAttendanceChartComponent,
    GoogleTimelineChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AttendanceRoutingModule,
    Ng2GoogleChartsModule
  ]
})
export class AttendanceModule {}
