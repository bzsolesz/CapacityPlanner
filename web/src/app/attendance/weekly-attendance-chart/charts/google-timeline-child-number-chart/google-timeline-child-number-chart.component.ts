import { Component, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { WeeklyAttendanceData } from "../../weekly-attendance-data";
import { WeekDay, AttendanceTime } from "../../../../shared/date";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

@Component({
  selector: "app-google-timeline-child-number-chart",
  templateUrl: "./google-timeline-child-number-chart.component.html",
  styleUrls: ["google-timeline-child-number-chart.component.css"]
})
export class GoogleTimelineChildNumberChartComponent implements OnInit, OnDestroy {
  constructor (private sanitizer: DomSanitizer) {}

  private static readonly TIMELINE_HEAD: object[] = [
    { type: "string", id: "Day" },
    { type: "string", id: "ChildNumber" },
    { type: "string", role: "style" },
    { type: "date", id: "From" },
    { type: "date", id: "To" }
  ];
  private static readonly COLORS_COLD_HOT: string[] = [
    "#2503FC", "#037CFC", "#03FCF8", "#83FC03", "#CFFC03", "#F8FC03", "#FCC303", "#FC8003", "#FC0303"
  ];
  private static readonly COLORS_GREEN_SHADES: string[] = [
    "#D5F5E3", "#ABEBC6", "#82E0AA", "#58D68D", "#2ECC71", "#28B463", "#239B56", "#1D8348", "#186A3B"
  ];
  private static readonly PERIODS: Period[] = GoogleTimelineChildNumberChartComponent.getPeriods();

  public size: number = 12;
  public showNumbers: boolean = true;
  public showTooltip: boolean = false;
  public palette: string = "COLORS_COLD_HOT";

  @Input()
  public weeklyAttendance: Observable<WeeklyAttendanceData>;
  private weeklyAttendanceSnapshot: WeeklyAttendanceData;

  // tslint:disable-next-line:no-any
  private timelineChildNumberChartData: any = {
    chartType: "Timeline",
    options: {
      timeline: {
        barLabelStyle: { fontSize: this.size},
        showBarLabels: this.showNumbers
      },
      tooltip: {
        trigger: GoogleTimelineChildNumberChartComponent.toTooltipTrigger(this.showTooltip)
      },
      avoidOverlappingGridLines: false,
      height: 550
    }
  };

  @ViewChild("GoogleTimelineChildNumberChart")
  // tslint:disable-next-line:no-any
  public chart: any;

  private dataSubscription: Subscription;

  // tslint:disable-next-line:no-any
  private static toTimelineChartData(weeklyAttendance: WeeklyAttendanceData, palette: string): Array<any> {
    // tslint:disable-next-line:no-any
    const dataTable: Array<any> = [];
    const colors: string[] = palette === "COLORS_COLD_HOT" ? this.COLORS_COLD_HOT : this.COLORS_GREEN_SHADES;

    dataTable.push(GoogleTimelineChildNumberChartComponent.TIMELINE_HEAD);

    Object.keys(WeekDay).forEach((day: WeekDay) => {
      let childrenNumber: number = 0;
      let from: AttendanceTime;
      let to: AttendanceTime;
      GoogleTimelineChildNumberChartComponent.PERIODS.forEach((period: Period) => {
        const children: string[] = weeklyAttendance.getAttendingChildrenByDayPeriod(day, period.from, period.to);
        if (children.length !== childrenNumber) {
          this.pushDataTableEntry(dataTable, day, childrenNumber, colors, from, to);
          childrenNumber = children.length;
          from = period.from;
          to = period.to;
        } else {
          to = period.to;
        }
      });
      this.pushDataTableEntry(dataTable, day, childrenNumber, colors, from, to);
    });
    return dataTable;
  }

  // tslint:disable-next-line:no-any
  private static pushDataTableEntry(dataTable: Array<any>, day: WeekDay, childrenNumber: number,
    colors: string[], from: AttendanceTime, to: AttendanceTime): void {
    if (childrenNumber !== 0) {
      dataTable.push([
        day,
        childrenNumber,
        colors[childrenNumber - 1],
        WeeklyAttendanceData.timeToDate(from),
        WeeklyAttendanceData.timeToDate(to)
      ]);
    }
  }

  private static toTooltipTrigger(showTooltip: boolean): string {
    return showTooltip ? "focus" : "none";
  }

  private static getPeriods(): Period[] {
    const periods: Period[] = [];
    const timeKeys: string[] = Object.keys(AttendanceTime);
    for (let keyIndex: number = 0; keyIndex < timeKeys.length - 1; keyIndex++) {
      periods.push({from: AttendanceTime[timeKeys[keyIndex]], to: AttendanceTime[timeKeys[keyIndex + 1]]});
    }
    return periods;
  }

  public ngOnInit(): void {
    this.dataSubscription = this.weeklyAttendance.subscribe((weeklyAttendance: WeeklyAttendanceData) => {
      this.weeklyAttendanceSnapshot = weeklyAttendance;
      this.timelineChildNumberChartData.dataTable =
        GoogleTimelineChildNumberChartComponent.toTimelineChartData(weeklyAttendance, this.palette);
    });
  }

  public ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  public redraw(): void {
    this.chart.wrapper.setDataTable(
      GoogleTimelineChildNumberChartComponent.toTimelineChartData(this.weeklyAttendanceSnapshot, this.palette));

    this.chart.options.timeline.barLabelStyle.fontSize = this.size;
    this.chart.options.timeline.showBarLabels = this.showNumbers;
    this.chart.options.tooltip.trigger = GoogleTimelineChildNumberChartComponent.toTooltipTrigger(this.showTooltip);
    this.chart.redraw();
  }

  public paletteColor(colorIndex: number): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(GoogleTimelineChildNumberChartComponent[this.palette][colorIndex]);
  }

  public paletteTextColor(colorIndex: number): SafeStyle {
    const backgroundColor: string = GoogleTimelineChildNumberChartComponent[this.palette][colorIndex].replace("#", "");
    const r: number = parseInt(backgroundColor.substring(0, 2), 16);
    const g: number = parseInt(backgroundColor.substring(2, 4), 16);
    const b: number = parseInt(backgroundColor.substring(4, 6), 16);
    const color: string = (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 155) ? "#000" : "#fff";
    return this.sanitizer.bypassSecurityTrustStyle(color);
  }
}

interface Period {
  from: AttendanceTime;
  to: AttendanceTime;
}
