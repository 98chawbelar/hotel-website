import { useEffect, useState } from "react";
import {
  FaBed,
  FaDoorOpen,
  FaDoorClosed,
  FaMoneyBillWave,
  FaHotel,
  FaChartLine,
} from "react-icons/fa";

import RevenueChart from "./RevenueChart";
import Loading from "../../../components/Loading";
import api from "../../../api/client.api";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { useFetchAllRoomsQuery } from "../../../redux/features/rooms/roomsApi";
import { useFetchBookingsAllQuery } from "../../../redux/features/booking/bookingApi";
import { useGetRevenueAnalyticsQuery } from "../../../redux/features/revenue/revenueApi";

const Dashboard = () => {
  const { data: roomsData, isLoading: roomsLoading } = useFetchAllRoomsQuery();

  const { data: bookingsData, isLoading: bookingsLoading } =
    useFetchBookingsAllQuery();

  const { data: revenueData, isLoading: revenueLoading } =
    useGetRevenueAnalyticsQuery();

  const rooms = roomsData?.rooms || [];
  const bookings = Array.isArray(bookingsData) ? bookingsData : [];
  const totalRooms = rooms.length;
  const totalBookings = bookings.length;
  const reservedRooms = bookings.filter((booking) =>
    ["pending", "confirmed", "checked_in"].includes(booking.bookingStatus),
  ).length;
  const availableRooms = Math.max(totalRooms - reservedRooms, 0);
  const totalRevenue = revenueData?.totalRevenue || 0;

  const loading = roomsLoading || bookingsLoading || revenueLoading;

  if (loading) return <Loading />;

  return (
    <section className="relative  min-h-screen overflow-hidden rounded-xl bg-gray-600 px-4 sm:px-6 lg:px-8 py-8">
      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-175 bg-primary/30 blur-[180px] rounded-full" />

      {/* TOP LINE */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 max-w-400 mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <PageHeader
            title="Hotel Admin Dashboard"
            subtitle="Welcome back! Here’s your hotel management overview."
          />
        </div>

        {/* HERO OVERVIEW */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* LEFT */}
          <div className="xl:col-span-2   border-0 rounded-[32px] p-8 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-72 h-72  rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-3xl  flex items-center justify-center">
                  <FaHotel className="text-accent text-3xl" />
                </div>

                <div>
                  <p className="uppercase tracking-[4px] text-accent text-xs mb-1">
                    Kandaw101 Hotel
                  </p>

                  <h1 className="text-3xl sm:text-4xl font-black text-secondary">
                    Dashboard Overview
                  </h1>
                </div>
              </div>

              <p className="text-secondary/55 leading-8 max-w-3xl">
                Monitor hotel performance, revenue analytics, room availability,
                reservations, and booking operations in one modern dashboard.
              </p>

              {/* QUICK STATS */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
                <div className=" rounded-3xl p-5">
                  <h2 className="text-3xl font-black text-accent">
                    {totalRooms || 0}
                  </h2>

                  <p className="text-secondary/55 mt-2 text-sm">Total Rooms</p>
                </div>

                <div className=" border-white/5 rounded-3xl p-5">
                  <h2 className="text-3xl font-black text-green-400">
                    {availableRooms || 0}
                  </h2>

                  <p className="text-secondary/55 mt-2 text-sm">Available</p>
                </div>

                <div className=" border-white/5 rounded-3xl p-5">
                  <h2 className="text-3xl font-black text-red-400">
                    {reservedRooms || 0}
                  </h2>

                  <p className="text-secondary/55 mt-2 text-sm">Reserved</p>
                </div>

                <div className=" rounded-3xl p-5">
                  <h2 className="text-3xl font-black text-primary">
                    {totalBookings || 0}
                  </h2>

                  <p className="text-secondary/55 mt-2 text-sm">Bookings</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
        </div>

        {/* STAT CARDS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Rooms"
            value={totalRooms}
            icon={<FaBed />}
            borderColor="border-accent"
            iconBg="bg-accent/60"
            iconColor="text-gray-400"
            valueColor="text-white"
            cardBg="bg-white/5"
          />

          <StatCard
            title="Total Revenue"
            value={
              totalRevenue > 0
                ? `${totalRevenue.toLocaleString()} Ks`
                : "No Revenue"
            }
            icon={<FaMoneyBillWave />}
            borderColor="border-green-500"
            iconBg="bg-green-500/10"
            iconColor="text-green-400"
            valueColor="text-white"
            cardBg="bg-white/5"
          />

          <StatCard
            title="Available Rooms"
            value={availableRooms}
            icon={<FaDoorOpen />}
            borderColor="border-primary/60"
            iconBg="bg-primary/5"
            iconColor="text-primary"
          />

          <StatCard
            title="Reserved Rooms"
            value={reservedRooms}
            icon={<FaDoorClosed />}
            borderColor="border-red-400"
            iconBg="bg-red-500/10"
            iconColor="text-red-400"
          />
        </section>

        {/* CHART + SUMMARY */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
          {/* CHART */}
          <div className="xl:col-span-2   rounded-[32px] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="uppercase tracking-[4px] text-accent text-xs mb-2">
                  Analytics
                </p>

                <h2 className="text-3xl font-black text-secondary">
                  Monthly Revenue
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <FaChartLine className="text-accent text-2xl" />
              </div>
            </div>

            <div className=" rounded-[28px] p-5">
              <RevenueChart />
            </div>
          </div>

          {/* SUMMARY */}
          <div className=" rounded-[32px] p-6 shadow-2xl">
            <div className="mb-8">
              <p className="uppercase tracking-[4px] text-accent text-xs mb-2">
                Hotel Summary
              </p>

              <h2 className="text-3xl font-black text-secondary">
                Booking Insights
              </h2>
            </div>

            <div className="space-y-5">
              <div className=" rounded-3xl p-5">
                <p className="text-secondary/55 text-sm mb-2">Total Bookings</p>

                <h3 className="text-3xl font-black text-secondary">
                  {totalBookings}
                </h3>
              </div>

              <div className=" rounded-3xl p-5">
                <p className="text-secondary/55 text-sm mb-2">
                  Available Rooms
                </p>

                <h3 className="text-3xl font-black text-green-400">
                  {availableRooms}
                </h3>
              </div>

              <div className=" rounded-3xl p-5">
                <p className="text-secondary/55 text-sm mb-2">Reserved Rooms</p>

                <h3 className="text-3xl font-black text-red-400">
                  {reservedRooms}
                </h3>
              </div>

              <div className=" rounded-3xl p-5">
                <p className="text-secondary/55 text-sm mb-2">Total Revenue</p>

                <h3 className="text-3xl font-black text-accent">
                  {totalRevenue > 0
                    ? `${totalRevenue.toLocaleString()} Ks`
                    : "No Revenue"}
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div className="mt-12 text-center">
          <p className="text-secondary/35 text-xs tracking-[3px] uppercase">
            ©2026 Kandaw101Hotel Admin Dashboard
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
