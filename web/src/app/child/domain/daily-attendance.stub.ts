import { DailyAttendance } from ".";

export function defaultDailyAttendance(overrides?: Partial<DailyAttendance>): DailyAttendance {
  const defaultObject: DailyAttendance = {
    from: "08:30",
    to: "18:30"
  };
  return { ...defaultObject, ...overrides };
}
