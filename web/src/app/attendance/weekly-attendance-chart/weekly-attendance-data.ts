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
    const dayString: string = (WeekDay[day] as string).toLowerCase();

    children
      .filter((child: Child) => child.attendance && child.attendance[dayString])
      .forEach((child: Child) => dailyChildAttendance.set(child.firstName, child.attendance[dayString]));

    this.attendanceMap.set(day, dailyChildAttendance);
  }

  public getAttendanceByDay(day: WeekDay): Map<string, DailyAttendance> {
    return this.attendanceMap.get(day);
  }

  public getBusiestDay(): WeekDay {
    let busiestDay: WeekDay = MONDAY;

    Object.keys(WeekDay).forEach((day: WeekDay) => {
      if (this.attendanceMap.get(day).size > this.attendanceMap.get(busiestDay).size) {
        busiestDay = day;
      }
    });
    return busiestDay;
  }

  public getAttendingChildrenByDay(day: WeekDay): string[] {
    return Array.from(this.attendanceMap.get(day).keys());
  }
}
