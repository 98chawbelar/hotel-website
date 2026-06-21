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

const roomsApi = createApi({
  reducerPath: "roomsApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Rooms"],

  endpoints: (builder) => ({
    // Get All Rooms
    fetchAllRooms: builder.query({
      query: () => ({
        url: "/api/rooms",
        method: "GET",
      }),

      providesTags: ["Rooms"],
    }),

    // Get Archived Rooms
    fetchArchivedRooms: builder.query({
      query: () => ({
        url: "/api/rooms/archived/all",
        method: "GET",
      }),

      providesTags: ["Rooms"],
    }),

    //  Get Single Room
    fetchRoomById: builder.query({
      query: (id) => ({
        url: `/api/rooms/${id}`,
        method: "GET",
      }),

      providesTags: (result, error, id) => [{ type: "Rooms", id }],
    }),

    //  Add Room
    addRoom: builder.mutation({
      query: (newRoom) => ({
        url: "/api/rooms/create-room",
        method: "POST",
        data: newRoom,
      }),

      invalidatesTags: ["Rooms"],
    }),

    // Update Room
    updateRoom: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/rooms/edit/${id}`,
        method: "PUT",
        data,
      }),

      invalidatesTags: ["Rooms"],
    }),

    // Soft Delete
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/api/rooms/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Rooms"],
    }),

    //Restore Archived Room
    restoreRoom: builder.mutation({
      query: (id) => ({
        url: `/api/rooms/restore/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: ["Rooms"],
    }),

    //  Permanent Delete Room
    permanentDeleteRoom: builder.mutation({
      query: (id) => ({
        url: `/api/rooms/permanent-delete/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useFetchAllRoomsQuery,
  useFetchArchivedRoomsQuery,
  useFetchRoomByIdQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useRestoreRoomMutation,
  usePermanentDeleteRoomMutation,
} = roomsApi;

export default roomsApi;
