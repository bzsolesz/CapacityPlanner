import { WeeklyAttendance } from ".";
import { defaultDailyAttendance } from "./daily-attendance.stub";

export function defaultWeeklyAttendance(overrides?: Partial<WeeklyAttendance>): WeeklyAttendance {
  const defaultObject: WeeklyAttendance = {
    id: 12345,
    monday: defaultDailyAttendance(),
    tuesday: defaultDailyAttendance({from: "09:00"}),
    wednesday: defaultDailyAttendance({from: "09:30"}),
    thursday: defaultDailyAttendance({to: "18:00"}),
    friday: defaultDailyAttendance({to: "17:30"})
  };
  return { ...defaultObject, ...overrides };
}
