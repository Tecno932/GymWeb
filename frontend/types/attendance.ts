export interface AttendanceMember {
  id: string;
  firstName: string;
  lastName: string;
  dni?: string | null;
}

export interface Attendance {
  id: string;
  memberId: string;
  checkIn: string;
  checkOut?: string | null;

  member?: AttendanceMember;
}