import { WeeklyAttendance } from ".";
import { defaultDailyAttendance } from "./daily-attendance.stub";
import { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY } from "../../shared/date";

export function defaultWeeklyAttendance(overrides?: Partial<WeeklyAttendance>): WeeklyAttendance {
  const defaultObject: WeeklyAttendance = {
    id: 12345,
    [MONDAY]: defaultDailyAttendance(),
    [TUESDAY]: defaultDailyAttendance({from: "09:00"}),
    [WEDNESDAY]: defaultDailyAttendance({from: "09:30"}),
    [THURSDAY]: defaultDailyAttendance({to: "18:00"}),
    [FRIDAY]: defaultDailyAttendance({to: "17:30"})
  };
  return { ...defaultObject, ...overrides };
}
