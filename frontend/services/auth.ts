import { api } from "./api";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export async function login(dto: LoginDto) {
  const { data } = await api.post<LoginResponse>(
    "/auth/login",
    dto,
  );

  return data;
}