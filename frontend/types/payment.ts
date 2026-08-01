export type PaymentMethod =
  | "CASH"
  | "TRANSFER"
  | "CARD"
  | "OTHER";


export interface PaymentMember {
  id: string;
  firstName: string;
  lastName: string;
  dni?: string | null;
}


export interface PaymentPlan {
  id: string;
  name: string;
  durationDays: number;
}


export interface PaymentMembership {
  id: string;
  memberId: string;
  planId: string;

  price: number | string;

  startDate: string;
  endDate: string;

  status: string;

  observations?: string | null;

  member?: PaymentMember;
  plan?: PaymentPlan;
}


export interface Payment {
  id: string;

  membershipId: string;

  invoiceId?: string | null;

  amount: number | string;

  method:
    | "CASH"
    | "TRANSFER"
    | "CARD"
    | "OTHER";

  observations?: string | null;

  paidAt: string;

  dueDate: string;

  receiptNumber?: string | null;

  createdAt: string;

  membership?: PaymentMembership;
}

export interface PaymentsResponse {
  items: Payment[];

  total: number;

  page: number;

  limit: number;

  pages: number;
}