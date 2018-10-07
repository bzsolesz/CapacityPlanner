import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WeeklyAttendanceChartComponent } from "./weekly-attendance-chart/weekly-attendance-chart.component";

const attendanceRoutes: Routes = [
  { path: "attendance", children: [
    { path: "weekly", component: WeeklyAttendanceChartComponent },
    { path: "", redirectTo: "weekly", pathMatch: "full"}
  ]}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(attendanceRoutes)
  ]
})
export class AttendanceRoutingModule {}
