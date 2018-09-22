import { DailyAttendance } from ".";

export interface WeeklyAttendance {
    id: number;
    monday?: DailyAttendance;
    tuesday?: DailyAttendance;
    wednesday?: DailyAttendance;
    thursday?: DailyAttendance;
    friday?: DailyAttendance;
}
