import { createApi } from "@reduxjs/toolkit/query/react";

import api from "../../../api/client.api";

// AXIOS BASE QUERY
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

export const revenueApi = createApi({
  reducerPath: "revenueApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Revenue"],

  endpoints: (builder) => ({
    // ================= GET REVENUE ANALYTICS =================
    getRevenueAnalytics: builder.query({
      query: () => ({
        url: "/api/revenue",
        method: "GET",
      }),

      providesTags: ["Revenue"],
    }),

    // ================= GET MONTHLY REVENUE =================
    getMonthlyRevenue: builder.query({
      query: () => ({
        url: "/api/revenue/monthly",
        method: "GET",
      }),

      providesTags: ["Revenue"],
    }),

    // ================= GET YEARLY REVENUE =================
    getYearlyRevenue: builder.query({
      query: () => ({
        url: "/api/revenue/yearly",
        method: "GET",
      }),

      providesTags: ["Revenue"],
    }),

    // ================= GET REVENUE SUMMARY =================
    getRevenueSummary: builder.query({
      query: () => ({
        url: "/api/revenue/summary",
        method: "GET",
      }),

      providesTags: ["Revenue"],
    }),
  }),
});

export const {
  useGetRevenueAnalyticsQuery,
  useGetMonthlyRevenueQuery,
  useGetYearlyRevenueQuery,
  useGetRevenueSummaryQuery,
} = revenueApi;

export default revenueApi;
