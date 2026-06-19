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

      return { data: result.data };
    } catch (error) {
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

const bookingApi = createApi({
  reducerPath: "bookingApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Bookings"],

  endpoints: (builder) => ({
    // ==========================
    // PRICE PREVIEW
    // ==========================
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

    // ==========================
    // CREATE BOOKING
    // ==========================
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/api/bookings",
        method: "POST",
        data: bookingData,
      }),

      invalidatesTags: ["Bookings"],
    }),

    // ==========================
    // GET ALL BOOKINGS
    // ==========================
    fetchBookingsAll: builder.query({
      query: () => ({
        url: "/api/bookings",
        method: "GET",
      }),

      transformResponse: (response) => response?.bookings || response,

      providesTags: ["Bookings"],
    }),

    // ==========================
    // GET SINGLE BOOKING
    // ==========================
    fetchBookingById: builder.query({
      query: (id) => ({
        url: `/api/bookings/${id}`,
        method: "GET",
      }),

      transformResponse: (response) => response?.booking || response,

      providesTags: (result, error, id) => [{ type: "Bookings", id }],
    }),

    // ==========================
    // GET BOOKINGS BY EMAIL
    // ==========================
    fetchBookingsByEmail: builder.query({
      query: (email) => ({
        url: `/api/bookings/email/${email}`,
        method: "GET",
      }),

      transformResponse: (response) => response?.bookings || response,

      providesTags: ["Bookings"],
    }),

    // ==========================
    // UPDATE STATUS
    // ==========================
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

    // ==========================
    // CANCEL BOOKING
    // ==========================
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/api/bookings/${id}/cancel`,
        method: "PATCH",
      }),

      invalidatesTags: ["Bookings"],
    }),

    // ==========================
    // DELETE BOOKING
    // ==========================
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
  useFetchBookingsAllQuery,
  useFetchBookingByIdQuery,
  useFetchBookingsByEmailQuery,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;

export default bookingApi;
