export enum MemberStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Member {
  id: string;

  firstName: string;

  lastName: string;

  dni: string;

  email?: string;

  phone?: string;

  status: MemberStatus;

  createdAt: string;
}

export interface MembersResponse {
  items: Member[];

  total: number;

  page: number;

  limit: number;

  pages: number;
}