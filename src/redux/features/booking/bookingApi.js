import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const bookingApi = createApi({
  reducerPath: "bookingApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/bookings`,
    credentials: "include",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Bookings"],

  endpoints: (builder) => ({
    // ================= CREATE BOOKING =================
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/",
        method: "POST",
        body: bookingData,
      }),

      invalidatesTags: ["Bookings"],
    }),

    // ================= GET BOOKINGS BY EMAIL =================
    fetchBookingsByEmail: builder.query({
      query: (email) => `/email/${email}`,

      providesTags: ["Bookings"],
    }),

    // ================= GET SINGLE BOOKING =================
    fetchBookingById: builder.query({
      query: (id) => `/${id}`,

      providesTags: (result, error, id) => [{ type: "Bookings", id }],
    }),

    // ================= UPDATE BOOKING STATUS =================
    updateBookingStatus: builder.mutation({
      query: ({ id, bookingStatus }) => ({
        url: `/${id}/status`,
        method: "PATCH",

        body: {
          bookingStatus,
        },
      }),

      invalidatesTags: ["Bookings"],
    }),

    // ================= CANCEL BOOKING =================
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/${id}/cancel`,
        method: "PATCH",
      }),

      invalidatesTags: ["Bookings"],
    }),

    // ================= DELETE BOOKING =================
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useFetchBookingsByEmailQuery,
  useFetchBookingByIdQuery,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;

export default bookingApi;
