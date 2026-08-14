import { api } from './api';

import type {
  Invoice,
  CreateInvoiceData,
  UpdateInvoiceData,
} from '@/types/invoice';


export async function getInvoices(): Promise<Invoice[]> {

  const {
    data,
  } = await api.get<Invoice[]>(
    '/invoices',
  );

  return data;
}


export async function getInvoice(
  id: string,
): Promise<Invoice> {

  const {
    data,
  } = await api.get<Invoice>(
    `/invoices/${id}`,
  );

  return data;
}


export async function createInvoice(
  data: CreateInvoiceData,
): Promise<Invoice> {

  const response =
    await api.post<Invoice>(
      '/invoices',
      data,
    );

  return response.data;
}


export async function updateInvoice(
  id: string,
  data: UpdateInvoiceData,
): Promise<Invoice> {

  const response =
    await api.patch<Invoice>(
      `/invoices/${id}`,
      data,
    );

  return response.data;
}


export async function deleteInvoice(
  id: string,
): Promise<void> {

  await api.delete(
    `/invoices/${id}`,
  );

}