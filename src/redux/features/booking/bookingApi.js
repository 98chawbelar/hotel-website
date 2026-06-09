import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";
import api from "../../../api/client.api";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({
        url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

const bookingApi = createApi({
  reducerPath: "bookingApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Bookings"],

  endpoints: (builder) => ({
    // ================= CREATE BOOKING =================
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/api/bookings",
        method: "POST",
        data: bookingData,
      }),

      invalidatesTags: ["Bookings"],
    }),

    // ================= GET BOOKINGS BY EMAIL =================
    fetchBookingsByEmail: builder.query({
      query: (email) => `/api/bookings/email/${email}`,

      providesTags: ["Bookings"],
    }),

    // ================= GET All BOOKINGS =================
    fetchBookingsAll: builder.query({
      query: () => ({
        url: "/api/bookings",
        method: "GET",
      }),
    }),

    // ================= GET SINGLE BOOKING =================
    fetchBookingById: builder.query({
      query: (id) => `/api/bookings/${id}`,

      providesTags: (result, error, id) => [{ type: "Bookings", id }],
    }),

    // ================= UPDATE BOOKING STATUS =================
    updateBookingStatus: builder.mutation({
      query: ({ id, bookingStatus }) => ({
        url: `/api/bookings/${id}/status`,
        method: "PATCH",

        data: { bookingStatus },
      }),

      invalidatesTags: ["Bookings"],
    }),

    // ================= CANCEL BOOKING =================
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/api/bookings/${id}/cancel`,
        method: "PATCH",
      }),

      invalidatesTags: ["Bookings"],
    }),

    // ================= DELETE BOOKING =================
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/api/bookings/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useFetchBookingsByEmailQuery,
  useFetchBookingsAllQuery,
  useFetchBookingByIdQuery,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;

export default bookingApi;
