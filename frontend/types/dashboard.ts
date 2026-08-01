export interface DashboardMember {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  status: string;
}


export interface DashboardPayment {
  id: string;

  amount: number | string;

  method: string;

  paidAt: string;

  membership: {
    member: {
      firstName: string;
      lastName: string;
    };

    plan: {
      name: string;
    };
  };
}


export interface DashboardExpiringMembership {
  id: string;

  startDate: string;

  endDate: string;

  price: number | string;

  status: string;

  member: {
    id: string;

    firstName: string;

    lastName: string;

    dni?: string | null;
  };

  plan: {
    id: string;

    name: string;

    durationDays: number;
  };
}


export interface DashboardAttendance {
  id: string;

  checkIn: string;

  checkOut: string | null;

  member: {
    id: string;

    firstName: string;

    lastName: string;
  };
}


export interface DashboardCurrentAttendance {
  id: string;

  checkIn: string;

  member: {
    id: string;

    firstName: string;

    lastName: string;

    dni?: string | null;
  };
}


export interface DashboardData {

  members: {

    total: number;

    active: number;

    inactive: number;

  };


  memberships: {

    active: number;

    expired: number;

    expiring:
      DashboardExpiringMembership[];

  };


  payments: {

    today: number | string;

    month: number | string;

    total: number | string;

  };


  attendance: {

    today: number;

    currentlyInside:
      DashboardCurrentAttendance[];

  };


  recentMembers:
    DashboardMember[];


  recentPayments:
    DashboardPayment[];


  recentAttendances:
    DashboardAttendance[];

}