import { api } from "@/services/api";

import {
  Plan,
} from "@/types/plan";

import {
  PlanFormValues,
} from "@/validations/plan-schema";


export async function getPlans(): Promise<Plan[]> {

  const response =
    await api.get<Plan[]>(
      "/plans",
    );

  return response.data;
}


export async function getPlan(
  id: string,
): Promise<Plan> {

  const response =
    await api.get<Plan>(
      `/plans/${id}`,
    );

  return response.data;
}


export async function createPlan(
  data: PlanFormValues,
): Promise<Plan> {

  const response =
    await api.post<Plan>(
      "/plans",
      data,
    );

  return response.data;
}


export async function updatePlan(
  id: string,
  data: Partial<PlanFormValues>,
): Promise<Plan> {

  const response =
    await api.patch<Plan>(
      `/plans/${id}`,
      data,
    );

  return response.data;
}


export async function deletePlan(
  id: string,
): Promise<Plan> {

  const response =
    await api.delete<Plan>(
      `/plans/${id}`,
    );

  return response.data;
}