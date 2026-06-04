import { configureStore } from "@reduxjs/toolkit";
import roomsApi from "./features/rooms/roomsApi";
import bookingApi from "./features/booking/bookingApi";

export const store = configureStore({
  reducer: {
    [roomsApi.reducerPath]: roomsApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomsApi.middleware, bookingApi.middleware),
});
