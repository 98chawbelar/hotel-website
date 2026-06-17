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

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/api/admin");

        setData(response.data);
      } catch (error) {
        console.error("Dashboard Error:", error);

        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("admin");

          window.location.href = "/admin-login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="relative min-h-screen overflow-hidden rounded-xl bg-primary px-4 sm:px-6 lg:px-8 py-8">
      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-175 bg-secondary/10 blur-[180px] rounded-full" />

      {/* TOP LINE */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-secondary/30 to-transparent" />

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
          <div className="xl:col-span-2 bg-secondary/10 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 blur-[120px] rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
                <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
                  <h2 className="text-3xl font-black text-accent">
                    {data.totalRooms}
                  </h2>

                  <p className="text-secondary/55 mt-2 text-sm">Total Rooms</p>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
                  <h2 className="text-3xl font-black text-green-400">
                    {data.availableRooms}
                  </h2>

                  <p className="text-secondary/55 mt-2 text-sm">Available</p>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
                  <h2 className="text-3xl font-black text-red-400">
                    {data.reservedRooms}
                  </h2>

                  <p className="text-secondary/55 mt-2 text-sm">Reserved</p>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
                  <h2 className="text-3xl font-black text-primary">
                    {data.totalBookings}
                  </h2>

                  <p className="text-secondary/55 mt-2 text-sm">Bookings</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-secondary/10 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="uppercase tracking-[4px] text-accent text-xs mb-2">
                  Revenue
                </p>

                <h2 className="text-3xl font-black text-secondary">
                  Total Income
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <FaMoneyBillWave className="text-accent text-2xl" />
              </div>
            </div>

            <div className="bg-white/5 rounded-[28px] p-6 border border-white/5">
              <h1 className="text-5xl font-black text-accent break-words">
                {data.totalRevenue}
              </h1>

              <p className="text-secondary/55 mt-2">MMK Revenue Generated</p>
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-5 py-4">
                <span className="text-secondary/60">Monthly Growth</span>

                <span className="text-green-400 font-bold">+12%</span>
              </div>

              <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-5 py-4">
                <span className="text-secondary/60">Occupancy Rate</span>

                <span className="text-accent font-bold">89%</span>
              </div>

              <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-5 py-4">
                <span className="text-secondary/60">Performance</span>

                <span className="text-primary font-bold">Excellent</span>
              </div>
            </div>
          </div>
        </div>

        {/* STAT CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Rooms"
            value={data.totalRooms}
            icon={<FaBed />}
            borderColor="border-accent"
            iconBg="bg-accent/60"
            iconColor="text-gray-400"
            valueColor="text-white"
            cardBg="bg-white/5"
          />

          <StatCard
            title="Total Revenue"
            value={`${data.totalRevenue} MMK`}
            icon={<FaMoneyBillWave />}
            borderColor="border-green-500"
            iconBg="bg-green-500/10"
            iconColor="text-green-400"
            valueColor="text-white"
            cardBg="bg-white/5"
          />

          <StatCard
            title="Available Rooms"
            value={data.availableRooms}
            icon={<FaDoorOpen />}
            borderColor="border-primary/60"
            iconBg="bg-primary/5"
            iconColor="text-primary"
          />

          <StatCard
            title="Reserved Rooms"
            value={data.reservedRooms}
            icon={<FaDoorClosed />}
            borderColor="border-red-400"
            iconBg="bg-red-500/10"
            iconColor="text-red-400"
          />
        </section>

        {/* CHART + SUMMARY */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
          {/* CHART */}
          <div className="xl:col-span-2 bg-secondary/10 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 shadow-2xl">
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

            <div className="bg-white/5 border border-white/5 rounded-[28px] p-5">
              <RevenueChart />
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-secondary/10 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 shadow-2xl">
            <div className="mb-8">
              <p className="uppercase tracking-[4px] text-accent text-xs mb-2">
                Hotel Summary
              </p>

              <h2 className="text-3xl font-black text-secondary">
                Booking Insights
              </h2>
            </div>

            <div className="space-y-5">
              <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
                <p className="text-secondary/55 text-sm mb-2">Total Bookings</p>

                <h3 className="text-3xl font-black text-secondary">
                  {data?.totalBookings}
                </h3>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
                <p className="text-secondary/55 text-sm mb-2">
                  Available Rooms
                </p>

                <h3 className="text-3xl font-black text-green-400">
                  {data?.availableRooms}
                </h3>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
                <p className="text-secondary/55 text-sm mb-2">Reserved Rooms</p>

                <h3 className="text-3xl font-black text-red-400">
                  {data?.reservedRooms}
                </h3>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
                <p className="text-secondary/55 text-sm mb-2">Total Revenue</p>

                <h3 className="text-3xl font-black text-accent">
                  {data?.totalRevenue} MMK
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
