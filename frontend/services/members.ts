import { api } from "./api";
import { MembersResponse } from "@/types/member";

import {
  MemberFormValues,
} from "@/validations/member-schema";

export async function getMembers(
  page = 1,
  limit = 10,
  search = "",
) {
  const { data } =
    await api.get<MembersResponse>(
      "/members",
      {
        params: {
          page,
          limit,
          search,
        },
      },
    );

  return data;
}

export async function createMember(
  data: MemberFormValues,
) {

  const response =
    await api.post(
      "/members",
      data,
    );

  return response.data;
}

export async function updateMember(
  id: string,
  data: MemberFormValues,
) {

  const response =
    await api.patch(
      `/members/${id}`,
      data,
    );

  return response.data;
}

export async function deleteMember(
  id: string,
) {

  await api.delete(
    `/members/${id}`,
  );

}