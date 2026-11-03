import { createApi } from "@reduxjs/toolkit/query/react";
import api from "../../../api/client.api";

const axiosBaseQuery =
  () =>
  async ({ url, method, data }) => {
    try {
      const response = await api({
        url,
        method,
        data,
      });

      return {
        data: response.data,
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

export const extrafacilitiesApi = createApi({
  reducerPath: "extrafacilitiesApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["ExtraFacilities"],

  endpoints: (builder) => ({
    // ==========================
    // CREATE EXTRA FACILITY
    // POST /api/extrafacilities
    // ==========================
    createExtraFacility: builder.mutation({
      query: (data) => ({
        url: "/api/extrafacilities",
        method: "POST",
        data,
      }),

      invalidatesTags: ["ExtraFacilities"],
    }),

    // ==========================
    // GET ALL EXTRA FACILITIES
    // GET /api/extrafacilities
    // ==========================
    fetchExtraFacilities: builder.query({
      query: () => ({
        url: "/api/extrafacilities",
        method: "GET",
      }),

      providesTags: ["ExtraFacilities"],
    }),

    // ==========================
    // UPDATE EXTRA FACILITY
    // PUT /api/extrafacilities/:id
    // ==========================
    updateExtraFacility: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/extrafacilities/${id}`,
        method: "PUT",
        data,
      }),

      invalidatesTags: ["ExtraFacilities"],
    }),

    // ==========================
    // ENABLE / DISABLE FACILITY
    // PATCH /api/extrafacilities/:id/status
    // ==========================
    toggleExtraFacility: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/api/extrafacilities/${id}`,
        method: "PUT",
        data: {
          isActive,
        },
      }),

      invalidatesTags: ["ExtraFacilities"],
    }),
  }),
});

export const {
  useFetchExtraFacilitiesQuery,
  useCreateExtraFacilityMutation,
  useUpdateExtraFacilityMutation,
  useToggleExtraFacilityMutation,
} = extrafacilitiesApi;

export default extrafacilitiesApi;
