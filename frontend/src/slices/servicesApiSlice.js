import { SERVICES_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: SERVICES_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Services'],
    }),
    getServiceDetails: builder.query({
      query: (serviceId) => ({
        url: `${SERVICES_URL}/${serviceId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createService: builder.mutation({
      query: () => ({
        url: `${SERVICES_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Service'],
    }),
    updateService: builder.mutation({
      query: (data) => ({
        url: `${SERVICES_URL}/${data.serviceId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Services'],
    }),
    uploadServiceImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteService: builder.mutation({
      query: (serviceId) => ({
        url: `${SERVICES_URL}/${serviceId}`,
        method: 'DELETE',
      }),
      providesTags: ['Service'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${SERVICES_URL}/${data.serviceId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    getTopServices: builder.query({
      query: () => `${SERVICES_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceDetailsQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useUploadServiceImageMutation,
  useDeleteServiceMutation,
  useCreateReviewMutation,
  useGetTopServicesQuery,
} = servicesApiSlice;
