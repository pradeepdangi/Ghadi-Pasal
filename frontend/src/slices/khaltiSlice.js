import { apiSlice } from './apiSlice';
import { KHALTI_URL } from '../constants';

// const API_URL = '/api'; // Adjust the URL to include the '/api' prefix

export const khaltiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    InitiatePayment: builder.mutation({
      query: (data) => ({
        url: `${KHALTI_URL}/khalti`,
        method: 'POST',
        body: data,
      }),
    }),


    // cont
    Confirmation: builder.mutation({
      query: (data) => ({
        url: `${KHALTI_URL}/khalti_com`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  useConfirmationMutation,
} = khaltiSlice;