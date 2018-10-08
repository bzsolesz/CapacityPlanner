import { Component, OnInit } from "@angular/core";
import { ChildService, Child } from "../../child/domain";
import { WeeklyAttendanceData } from "./weekly-attendance-data";
import { Observable } from "rxjs/Observable";

@Component({
  templateUrl: "./weekly-attendance-chart.component.html",
  styleUrls: ["./weekly-attendance-chart.component.css"]
})
export class WeeklyAttendanceChartComponent implements OnInit {
  public constructor(private childService: ChildService) {}
  public $weeklyAttendance: Observable<WeeklyAttendanceData>;
  public chartType: string = "candlestick";

  public ngOnInit(): void {
    this.initWeeklyAttendanceData();
  }

  public print(): void {
    window.print();
  }

  private initWeeklyAttendanceData(): void {
    this.$weeklyAttendance = this.childService.getAllChildren()
      .map((children: Child[]) => new WeeklyAttendanceData(children));
  }
}
