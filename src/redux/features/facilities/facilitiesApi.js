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

export const facilitiesApi = createApi({
  reducerPath: "facilitiesApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Facilities"],

  endpoints: (builder) => ({
    // CREATE FACILITY
    // POST /api/facilities

    createFacilities: builder.mutation({
      query: (data) => ({
        url: "/api/facilities",

        method: "POST",

        data,
      }),

      invalidatesTags: ["Facilities"],
    }),

    // GET ALL FACILITIES
    // GET /api/facilities

    fetchFacilities: builder.query({
      query: () => ({
        url: "/api/facilities",

        method: "GET",
      }),

      providesTags: ["Facilities"],
    }),

    // UPDATE FACILITY
    // PUT /api/facilities/edit/:id

    updateFacilities: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/facilities/edit/${id}`,

        method: "PUT",

        data,
      }),

      invalidatesTags: ["Facilities"],
    }),
  }),
});

export const {
  useFetchFacilitiesQuery,

  useCreateFacilitiesMutation,

  useUpdateFacilitiesMutation,
} = facilitiesApi;

export default facilitiesApi;
