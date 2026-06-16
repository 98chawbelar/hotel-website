import { createApi } from "@reduxjs/toolkit/query/react";
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

      return {
        data: result.data,
      };
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
    // ================= PRICE PREVIEW =================
    calculatePricePreview: builder.mutation({
      query: ({ roomId, checkIn, checkOut, extrasTotal = 0 }) => ({
        url: "/api/bookings/price-preview",
        method: "POST",
        data: {
          roomId,
          checkIn,
          checkOut,
          extrasTotal,
        },
      }),
    }),

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
      query: (email) => ({
        url: `/api/bookings/email/${email}`,
        method: "GET",
      }),

      providesTags: ["Bookings"],
    }),

    // ================= GET ALL BOOKINGS =================
    fetchBookingsAll: builder.query({
      query: () => ({
        url: "/api/bookings",
        method: "GET",
      }),

      providesTags: ["Bookings"],
    }),

    // ================= GET SINGLE BOOKING =================
    fetchBookingById: builder.query({
      query: (id) => ({
        url: `/api/bookings/${id}`,
        method: "GET",
      }),

      providesTags: (result, error, id) => [{ type: "Bookings", id }],
    }),

    // ================= UPDATE BOOKING STATUS =================
    updateBookingStatus: builder.mutation({
      query: ({ id, bookingStatus }) => ({
        url: `/api/bookings/${id}/status`,
        method: "PATCH",
        data: {
          bookingStatus,
        },
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
  useCalculatePricePreviewMutation,
  useCreateBookingMutation,
  useFetchBookingsByEmailQuery,
  useFetchBookingsAllQuery,
  useFetchBookingByIdQuery,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;

export default bookingApi;
