import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/rooms`,

  credentials: "include",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const roomsApi = createApi({
  reducerPath: "roomsApi",

  baseQuery,

  tagTypes: ["Rooms"],

  endpoints: (builder) => ({
    // ================= GET ALL ROOMS =================
    fetchAllRooms: builder.query({
      query: () => "/",

      providesTags: ["Rooms"],
    }),

    // ================= GET SINGLE ROOM =================
    fetchRoomById: builder.query({
      query: (id) => `/${id}`,

      providesTags: (result, error, id) => [{ type: "Rooms", id }],
    }),

    // ================= ADD ROOM =================
    addRoom: builder.mutation({
      query: (newRoom) => ({
        url: "/create-room",

        method: "POST",

        body: newRoom,
      }),

      invalidatesTags: ["Rooms"],
    }),

    // ================= UPDATE ROOM =================
    updateRoom: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/edit/${id}`,

        method: "PUT",

        body: rest,

        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["Rooms"],
    }),

    // ================= DELETE ROOM =================
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/${id}`,

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
