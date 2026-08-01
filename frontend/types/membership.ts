export interface MembershipMember {
  id: string;

  firstName: string;

  lastName: string;

  dni?: string | null;
}

export interface MembershipPlan {
  id: string;

  name: string;

  durationDays: number;
}

export interface Membership {
  id: string;

  memberId: string;

  planId: string;

  price: number | string;

  startDate: string;

  endDate: string;

  status: string;

  observations?: string | null;

  createdAt: string;

  updatedAt: string;

  member?: MembershipMember;

  plan?: MembershipPlan;
}