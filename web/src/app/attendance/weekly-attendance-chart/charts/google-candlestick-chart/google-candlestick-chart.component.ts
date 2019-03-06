import { Component, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { WeeklyAttendanceData } from "../../weekly-attendance-data";
import { WeekDay, AttendanceTime } from "../../../../shared/date";
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
        ticks: GoogleCandlestickChartComponent.getTicks()
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
    const children: string[] = weeklyAttendance.getAllhildren();

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
    const children: string[] = weeklyAttendance.getAllhildren();
    let head: string[] = ["Day"];

    children.forEach((child: string) => {
      head = head.concat(child, "", "", "");
    });
    return head;
  }

  private static toDataRow(from: string, to: string, barNotLine: boolean): number[] {
    return [
      WeeklyAttendanceData.timeToNumber(from),
      WeeklyAttendanceData.timeToNumber(from),
      WeeklyAttendanceData.timeToNumber(barNotLine ? to : from),
      WeeklyAttendanceData.timeToNumber(to)
    ];
  }

  private static toTooltipTrigger(showTooltip: boolean): string {
    return showTooltip ? "focus" : "none";
  }

  private static getTicks(): {v: number, f: string}[] {
    return Object.values(AttendanceTime)
      .map((time: string) => ({v: WeeklyAttendanceData.timeToNumber(time), f: time}));
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
