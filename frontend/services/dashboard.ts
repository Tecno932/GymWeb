import { api } from "./api";

import {
  DashboardData,
} from "@/types/dashboard";

export async function getDashboard() {

  const {
    data,
  } = await api.get<DashboardData>(
    "/dashboard",
  );

  return data;
}