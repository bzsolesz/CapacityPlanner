import { WeeklyAttendance } from ".";

export interface Child {
  id: number;
  firstName: string;
  surname: string;
  dateOfBirth: string;
  attendance?: WeeklyAttendance;
}
