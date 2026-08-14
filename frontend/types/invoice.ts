export type InvoiceStatus =
  | 'PENDING'
  | 'PAID'
  | 'OVERDUE'
  | 'CANCELLED';

export interface InvoicePayment {
  id: string;
  amount: number | string;
  method: string;
  paidAt: string;
}

export interface InvoiceMember {
  id: string;
  firstName: string;
  lastName: string;
  dni?: string | null;
}

export interface InvoicePlan {
  id: string;
  name: string;
}

export interface InvoiceMembership {
  id: string;
  price: number | string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  member: InvoiceMember;
  plan: InvoicePlan;
}

export interface Invoice {
  id: string;
  membershipId: string;
  amount: number | string;
  dueDate: string;
  status: InvoiceStatus;
  createdAt: string;
  updatedAt?: string;
  membership: InvoiceMembership;
  payments: InvoicePayment[];
}

export interface CreateInvoiceData {
  membershipId: string;
  amount: number;
  dueDate: string;
  status?: InvoiceStatus;
}

export interface UpdateInvoiceData {
  amount?: number;
  dueDate?: string;
  status?: InvoiceStatus;
}