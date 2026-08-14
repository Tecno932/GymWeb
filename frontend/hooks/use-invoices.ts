import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from '@/services/invoices';

import type {
  CreateInvoiceData,
  UpdateInvoiceData,
} from '@/types/invoice';


export const invoiceKeys = {

  all: ['invoices'] as const,

  lists: () =>
    [...invoiceKeys.all, 'list'] as const,

  detail: (id: string) =>
    [...invoiceKeys.all, 'detail', id] as const,

};


export function useInvoices() {

  return useQuery({

    queryKey:
      invoiceKeys.lists(),

    queryFn:
      getInvoices,

  });

}


export function useInvoice(
  id: string,
) {

  return useQuery({

    queryKey:
      invoiceKeys.detail(id),

    queryFn: () =>
      getInvoice(id),

    enabled:
      Boolean(id),

  });

}


export function useCreateInvoice() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      data: CreateInvoiceData,
    ) =>
      createInvoice(data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey:
          invoiceKeys.lists(),
      });

    },

  });

}


export function useUpdateInvoice() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateInvoiceData;
    }) =>
      updateInvoice(
        id,
        data,
      ),

    onSuccess: (
      invoice,
    ) => {

      queryClient.invalidateQueries({
        queryKey:
          invoiceKeys.lists(),
      });

      queryClient.setQueryData(
        invoiceKeys.detail(
          invoice.id,
        ),
        invoice,
      );

    },

  });

}


export function useDeleteInvoice() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      id: string,
    ) =>
      deleteInvoice(id),

    onSuccess: (
      _,
      id,
    ) => {

      queryClient.invalidateQueries({
        queryKey:
          invoiceKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey:
          invoiceKeys.detail(id),
      });

    },

  });

}