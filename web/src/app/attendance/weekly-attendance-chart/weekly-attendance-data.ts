import { WeekDay } from "../../shared/date";
import { DailyAttendance, Child } from "../../child/domain";
import { AttendanceTime } from "../../shared/date";

export class WeeklyAttendanceData {
  private attendanceMap: Map<WeekDay, Map<string, DailyAttendance>>;

  public constructor(children: Child[]) {
    this.attendanceMap = new Map();
    Object.keys(WeekDay).forEach((day: WeekDay) => {
      this.initDailyAttendanceMap(day, children);
    });
  }

  public static timeToDate(timeString: string): Date {
    const hourAndMinute: string[] = timeString.split(":");
    return new Date(0, 0, 0, Number(hourAndMinute[0]), Number(hourAndMinute[1]), 0);
  }

  public static timeToNumber(timeString: string): number {
    const hourAndMinute: string[] = timeString.split(":");
    return Number(hourAndMinute[0]) + (Number(hourAndMinute[1]) / 60);
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

  public getAttendingChildrenByDay(day: WeekDay): string[] {
    return Array.from(this.attendanceMap.get(day).keys());
  }

  public getAttendingChildrenByDayPeriod(day: WeekDay, from: AttendanceTime, to: AttendanceTime): string[] {
    const children: string[] = [];
    this.getAttendingChildrenByDay(day)
      .filter((child: string) => {
        const periodFrom: Date = WeeklyAttendanceData.timeToDate(from);
        const periodTo: Date = WeeklyAttendanceData.timeToDate(to);
        const attendance: DailyAttendance = this.attendanceMap.get(day).get(child);
        const childFrom: Date = WeeklyAttendanceData.timeToDate(attendance.from);
        const childTo: Date = WeeklyAttendanceData.timeToDate(attendance.to);
        return childFrom <= periodFrom && childTo >= periodTo;
      })
      .forEach((child: string) => children.push(child));
    return children;
  }

  public getAllhildren(): string[] {
    const children: string[] = [];
    Array.from(this.attendanceMap.values())
      .forEach((dailyAttendance: Map<string, DailyAttendance>) =>
        Array.from(dailyAttendance.keys())
          .filter((child: string) => !children.includes(child))
          .forEach((child: string) => children.push(child))
      );
    return children;
  }
}
