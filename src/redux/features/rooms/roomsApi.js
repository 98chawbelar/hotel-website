import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/rooms`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer${token}`);
    }
    return Headers;
  },
});

const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery,
  tagTypes: ["Rooms"],
  endpoints: (builder) => ({
    fetchAllRooms: builder.query({
      query: () => "/",
      providesTags: ["Rooms"],
    }),
    fetchRoomById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Rooms", id }],
    }),
    addRoom: builder.mutation({
      query: (newRoom) => ({
        url: `create-room`,
        method: "POST",
        body: newRoom,
      }),
      invalidatesTags: ["Rooms"],
    }),
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
    deleteBook: builder.mutation({
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
