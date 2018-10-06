import { WeekDay, MONDAY } from "../../shared/date";
import { DailyAttendance, Child } from "../../child/domain";

export class WeeklyAttendanceData {
  private attendanceMap: Map<WeekDay, Map<string, DailyAttendance>>;

  public constructor(children: Child[]) {
    this.attendanceMap = new Map();
    Object.keys(WeekDay).forEach((day: WeekDay) => {
      this.initDailyAttendanceMap(day, children);
    });
  }

  private initDailyAttendanceMap(day: WeekDay, children: Child[]): void {
    const dailyChildAttendance: Map<string, DailyAttendance> = new Map();

    children
      .filter((child: Child) => child.attendance && child.attendance[WeekDay[day]])
      .forEach((child: Child) => dailyChildAttendance.set(child.firstName, child.attendance[WeekDay[day]]));

    this.attendanceMap.set(WeekDay[day], dailyChildAttendance);
  }

  public getAttendanceByDay(day: WeekDay): Map<string, DailyAttendance> {
    return this.attendanceMap.get(day);
  }

  public getBusiestDay(): WeekDay {
    let busiestDay: WeekDay = WeekDay.MONDAY;

    Object.keys(WeekDay).forEach((day: WeekDay) => {
      if (this.attendanceMap.get(WeekDay[day]).size > this.attendanceMap.get(busiestDay).size) {
        busiestDay = WeekDay[day];
      }
    });
    return busiestDay;
  }

  public getAttendingChildrenByDay(day: WeekDay): string[] {
    return Array.from(this.attendanceMap.get(day).keys());
  }
}
