import { api } from "@/services/api";

import {
  Membership,
} from "@/types/membership";

import {
  MembershipFormValues,
} from "@/validations/membership-schema";


export async function getMemberships(): Promise<
  Membership[]
> {

  const response =
    await api.get<Membership[]>(
      "/memberships",
    );

  return response.data;
}


export async function getMembership(
  id: string,
): Promise<Membership> {

  const response =
    await api.get<Membership>(
      `/memberships/${id}`,
    );

  return response.data;
}


export async function createMembership(
  data: MembershipFormValues,
): Promise<Membership> {

  const response =
    await api.post<Membership>(
      "/memberships",
      data,
    );

  return response.data;
}


export async function updateMembership(
  id: string,
  data: Partial<MembershipFormValues>,
): Promise<Membership> {

  const response =
    await api.patch<Membership>(
      `/memberships/${id}`,
      data,
    );

  return response.data;
}


export async function deleteMembership(
  id: string,
): Promise<Membership> {

  const response =
    await api.delete<Membership>(
      `/memberships/${id}`,
    );

  return response.data;
}