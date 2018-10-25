import { Component, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { WeeklyAttendanceData } from "../../weekly-attendance-data";
import { WeekDay } from "../../../../shared/date";
import { DailyAttendance } from "../../../../child/domain";

@Component({
  selector: "app-google-candlestick-chart",
  templateUrl: "./google-candlestick-chart.component.html",
  styleUrls: ["google-candlestick-chart.component.css"]
})
export class GoogleCandlestickChartComponent implements OnInit, OnDestroy {
  @Input()
  public weeklyAttendance: Observable<WeeklyAttendanceData>;

  public size: string = "50%";
  public barNotLine: boolean = false;
  public showTooltip: boolean = false;

  // tslint:disable-next-line:no-any
  public candlestickChartData: any = {
    chartType: "CandlestickChart",
    options: {
      tooltip: {
        trigger: GoogleCandlestickChartComponent.toTooltipTrigger(this.showTooltip)
      },
      bar: {
        groupWidth: this.size
      },
      vAxis: {
        ticks: [
          {v: 8, f: "08:00"},
          {v: 8.5, f: "08:30"},
          {v: 9, f: "09:00"},
          {v: 10, f: "10:00"},
          {v: 11, f: "11:00"},
          {v: 12, f: "12:00"},
          {v: 13, f: "13:00"},
          {v: 14, f: "14:00"},
          {v: 15, f: "15:00"},
          {v: 16, f: "16:00"},
          {v: 17, f: "17:00"},
          {v: 18, f: "18:00"},
          {v: 18.5, f: "18:30"}]
      },
      chartArea: {
        left: 50,
        top: 10,
        width: "85%",
        height: "90%"
      },
      height: 550
    }
  };

  // tslint:disable-next-line:no-any
  public barDataTable: any;
  // tslint:disable-next-line:no-any
  public lineDataTable: any;

  @ViewChild("GoogleCandlestickChart")
  // tslint:disable-next-line:no-any
  public chart: any;

  private dataSubscription: Subscription;

  // tslint:disable-next-line:no-any
  private static toCandlestickChartData(weeklyAttendance: WeeklyAttendanceData, barNotLine: boolean): Array<any> {
    // tslint:disable-next-line:no-any
    const dataTable: Array<any> = [];
    const children: string[] = weeklyAttendance.getChildren();

    dataTable.push(this.initHead(weeklyAttendance));

    Object.keys(WeekDay).forEach((day: WeekDay) => {
      const dailyAttendanceMap: Map<string, DailyAttendance> = weeklyAttendance.getAttendanceByDay(day);

      // tslint:disable-next-line:no-any
      let dataRow: any[] = [day];
      children.forEach((child: string) => {
        if (dailyAttendanceMap.has(child)) {
          const attendance: DailyAttendance = dailyAttendanceMap.get(child);
          dataRow = dataRow.concat(this.toDataRow(attendance.from, attendance.to, barNotLine));
        } else {
          dataRow = dataRow.concat(8, 8, 8, 8);
        }
      });
      dataTable.push(dataRow);
    });
    return dataTable;
  }

  private static initHead(weeklyAttendance: WeeklyAttendanceData): string[] {
    const children: string[] = weeklyAttendance.getChildren();
    let head: string[] = ["Day"];

    children.forEach((child: string) => {
      head = head.concat(child, "", "", "");
    });
    return head;
  }

  private static toDataRow(from: string, to: string, barNotLine: boolean): number[] {
    return [
      this.toNumber(from),
      this.toNumber(from),
      this.toNumber(barNotLine ? to : from),
      this.toNumber(to)
    ];
  }

  private static toNumber(attendanceString: string): number {
    const hourAndMinute: string[] = attendanceString.split(":");
    return Number(hourAndMinute[0]) + (Number(hourAndMinute[1]) / 60);
  }

  private static toTooltipTrigger(showTooltip: boolean): string {
    return showTooltip ? "focus" : "none";
  }

  public ngOnInit(): void {
    this.dataSubscription = this.weeklyAttendance.subscribe((weeklyAttendance: WeeklyAttendanceData) => {
      this.barDataTable = GoogleCandlestickChartComponent.toCandlestickChartData(weeklyAttendance, true);
      this.lineDataTable = GoogleCandlestickChartComponent.toCandlestickChartData(weeklyAttendance, false);
      this.candlestickChartData.dataTable = this.barNotLine ? this.barDataTable : this.lineDataTable;
    });
  }

  public ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  public redraw(): void {
    this.chart.wrapper.setDataTable(this.barNotLine ? this.barDataTable : this.lineDataTable);
    this.chart.options.tooltip.trigger = GoogleCandlestickChartComponent.toTooltipTrigger(this.showTooltip);
    this.chart.options.bar.groupWidth = this.size;
    this.chart.redraw();
  }
}
