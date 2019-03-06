import { DailyAttendance } from ".";
import { AttendanceTime } from "../../shared/date";

export function defaultDailyAttendance(overrides?: Partial<DailyAttendance>): DailyAttendance {
  const defaultObject: DailyAttendance = {
    from: AttendanceTime._0830,
    to: AttendanceTime._1830
  };
  return { ...defaultObject, ...overrides };
}
