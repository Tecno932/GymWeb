import { api } from "./api";

import {
  Attendance,
} from "@/types/attendance";

export async function getAttendances() {
  const {
    data,
  } = await api.get<Attendance[]>(
    "/attendance",
  );

  return data;
}

export async function getMemberAttendances(
  memberId: string,
) {
  const {
    data,
  } = await api.get<Attendance[]>(
    `/attendance/member/${memberId}`,
  );

  return data;
}

export async function createAttendance(
  memberId: string,
) {
  const {
    data,
  } = await api.post<Attendance>(
    "/attendance",
    {
      memberId,
    },
  );

  return data;
}

export async function checkoutAttendance(
  id: string,
) {
  const {
    data,
  } = await api.patch<Attendance>(
    `/attendance/${id}/checkout`,
    {},
  );

  return data;
}

export async function deleteAttendance(
  id: string,
) {
  await api.delete(
    `/attendance/${id}`,
  );
}