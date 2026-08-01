export interface Plan {
  id: string;

  name: string;

  description?: string | null;

  durationDays: number;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}