import { configureStore } from "@reduxjs/toolkit";
import roomsApi from "./features/rooms/roomsApi";
import bookingApi from "./features/booking/bookingApi";
import revenueApi from "./features/revenue/revenueApi";
import facilitiesApi from "./features/facilities/facilitiesApi";
import extrafacilitiesApi from "./features/extrafacilities/extrafacilitiesApi";

export const store = configureStore({
  reducer: {
    [roomsApi.reducerPath]: roomsApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [revenueApi.reducerPath]: revenueApi.reducer,
    [facilitiesApi.reducerPath]: facilitiesApi.reducer,
    [extrafacilitiesApi.reducerPath]: extrafacilitiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomsApi.middleware,
      bookingApi.middleware,
      revenueApi.middleware,
      facilitiesApi.middleware,
      extrafacilitiesApi.middleware,
    ),
});
