import { api } from "./api";

import {
  Payment,
  PaymentsResponse,
} from "@/types/payment";

import {
  PaymentFormValues,
  UpdatePaymentValues,
} from "@/validations/payment-schema";


export async function getPayments(
  page = 1,
  limit = 10,
  search = '',
) {

  const {
    data,
  } = await api.get<PaymentsResponse>(
    "/payments",
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


export async function getPayment(
  id: string,
) {

  const {
    data,
  } = await api.get<Payment>(
    `/payments/${id}`,
  );

  return data;
}


export async function createPayment(
  data: PaymentFormValues,
) {

  const response =
    await api.post(
      "/payments",
      data,
    );

  return response.data;
}


export async function updatePayment(
  id: string,
  data: UpdatePaymentValues,
) {

  const response =
    await api.patch(
      `/payments/${id}`,
      data,
    );

  return response.data;
}


export async function deletePayment(
  id: string,
) {

  await api.delete(
    `/payments/${id}`,
  );

}