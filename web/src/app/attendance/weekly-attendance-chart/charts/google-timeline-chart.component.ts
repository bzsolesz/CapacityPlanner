import { Component, ViewChild, Input, OnInit, OnDestroy } from "@angular/core";
import { WeeklyAttendanceData } from "../weekly-attendance-data";
import { WeekDay } from "../../../shared/date";
import { DailyAttendance } from "../../../child/domain";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-google-timeline-chart",
  templateUrl: "./google-timeline-chart.component.html",
  styleUrls: ["google-timeline-chart.component.css"]
})
export class GoogleTimelineChartComponent implements OnInit, OnDestroy {
  private static readonly TIMELINE_HEAD: Array<Object> = [
    { type: "string", id: "Day" },
    { type: "string", id: "ChildName" },
    { type: "date", id: "From" },
    { type: "date", id: "To" }];

  public size: number = 8;
  public showNames: boolean = true;
  public showTooltip: boolean = false;
  public colorByDay: boolean = true;

  @Input()
  public weeklyAttendance: Observable<WeeklyAttendanceData>;

  // tslint:disable-next-line:no-any
  public timelineChartData: any = {
    chartType: "Timeline",
    options: {
      timeline: {
        barLabelStyle: { fontSize: this.size},
        showBarLabels: this.showNames,
        colorByRowLabel: this.colorByDay
      },
      tooltip: {
        trigger: GoogleTimelineChartComponent.toTooltipTrigger(this.showTooltip)
      },
      height: 500
    }
  };

  @ViewChild("GoogleTimelineChart")
  // tslint:disable-next-line:no-any
  public chart: any;

  private dataSubscription: Subscription;

  // tslint:disable-next-line:no-any
  private static toTimelineChartData(weeklyAttendance: WeeklyAttendanceData): Array<any> {
    // tslint:disable-next-line:no-any
    const dataTable: Array<any> = [];

    dataTable.push(GoogleTimelineChartComponent.TIMELINE_HEAD);

    Object.keys(WeekDay).forEach((day: WeekDay) => {
      weeklyAttendance.getBy(day).forEach((dailyAttendance: DailyAttendance, childName: string) => {
        dataTable.push([
          day,
          childName,
          this.toDate(dailyAttendance.from),
          this.toDate(dailyAttendance.to)
        ]);
      });
    });
    return dataTable;
  }

  private static toDate(attendanceString: string): Date {
    const hourAndMinute: string[] = attendanceString.split(":");
    return new Date(0, 0, 0, Number(hourAndMinute[0]), Number(hourAndMinute[1]), 0);
  }

  private static toTooltipTrigger(showTooltip: boolean): string {
    return showTooltip ? "focus" : "none";
  }

  public ngOnInit(): void {
    this.dataSubscription = this.weeklyAttendance.subscribe((weeklyAttendance: WeeklyAttendanceData) => {
      this.timelineChartData.dataTable = GoogleTimelineChartComponent.toTimelineChartData(weeklyAttendance);
    });
  }

  public ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  public redraw(): void {
    this.chart.options.timeline.barLabelStyle.fontSize = this.size;
    this.chart.options.timeline.showBarLabels = this.showNames;
    this.chart.options.timeline.colorByRowLabel = this.colorByDay;
    this.chart.options.tooltip.trigger = GoogleTimelineChartComponent.toTooltipTrigger(this.showTooltip);
    this.chart.redraw();
  }
}
