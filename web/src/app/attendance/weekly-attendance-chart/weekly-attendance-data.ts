import { WeekDay } from "../../shared/date";
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

    this.attendanceMap.set(day, dailyChildAttendance);
  }

  public getBy(day: WeekDay): Map<string, DailyAttendance> {
    return this.attendanceMap.get(day);
  }
}
