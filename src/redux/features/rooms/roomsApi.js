import { createApi } from "@reduxjs/toolkit/query/react";
import api from "../../../api/clientapi";

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

const roomsApi = createApi({
  reducerPath: "roomsApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Rooms"],

  endpoints: (builder) => ({
    fetchAllRooms: builder.query({
      query: () => ({
        url: "/api/rooms",
        method: "GET",
      }),

      providesTags: ["Rooms"],
    }),

    fetchRoomById: builder.query({
      query: (id) => ({
        url: `/api/rooms/${id}`,
        method: "GET",
      }),

      providesTags: (result, error, id) => [{ type: "Rooms", id }],
    }),

    addRoom: builder.mutation({
      query: (newRoom) => ({
        url: "/api/rooms/create-room",
        method: "POST",
        data: newRoom,
      }),

      invalidatesTags: ["Rooms"],
    }),

    updateRoom: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/api/rooms/edit/${id}`,
        method: "PUT",
        data: rest,
      }),

      invalidatesTags: ["Rooms"],
    }),

    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/api/rooms/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useFetchAllRoomsQuery,
  useFetchRoomByIdQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomsApi;

export default roomsApi;
