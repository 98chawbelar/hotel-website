import { useEffect, useState } from "react";
import {
  FaBed,
  FaDoorOpen,
  FaDoorClosed,
  FaMoneyBillWave,
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
    <div className="min-h-screen bg-secondary p-6">
      {/* Header */}
      <div className=" mb-2">
        <PageHeader
          title={"Hotel Admin Dashboard"}
          subtitle={"Welcome back! Here’s your hotel overview."}
        />
      </div>

      {/* Top Stats */}
      <section className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Rooms"
          value={data.totalRooms}
          icon={<FaBed />}
          borderColor="border-accent"
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />

        <StatCard
          title="Total Revenue"
          value={`${data.totalRevenue} MMK`}
          icon={<FaMoneyBillWave />}
          borderColor="border-green-500"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Available Rooms"
          value={data.availableRooms}
          icon={<FaDoorOpen />}
          borderColor="border-blue-500"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Reserved Rooms"
          value={data.reservedRooms}
          icon={<FaDoorClosed />}
          borderColor="border-red-500"
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </section>

      {/* Charts + Analytics */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-primary">Monthly Revenue</h2>

            <span className="bg-accent text-white text-sm px-4 py-1 rounded-full">
              Analytics
            </span>
          </div>

          <div className="bg-secondary rounded-xl p-4">
            <RevenueChart />
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Booking Summary
          </h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between bg-secondary p-4 rounded-xl">
              <span className="text-gray-600">Total Bookings</span>

              <span className="font-bold text-primary text-xl">
                {data?.totalBookings}
              </span>
            </div>

            <div className="flex items-center justify-between bg-secondary p-4 rounded-xl">
              <span className="text-gray-600">Available Rooms</span>

              <span className="font-bold text-green-600 text-xl">
                {data?.availableRooms}
              </span>
            </div>

            <div className="flex items-center justify-between bg-secondary p-4 rounded-xl">
              <span className="text-gray-600">Reserved Rooms</span>

              <span className="font-bold text-red-600 text-xl">
                {data?.reservedRooms}
              </span>
            </div>

            <div className="flex items-center justify-between bg-secondary p-4 rounded-xl">
              <span className="text-gray-600">Revenue</span>

              <span className="font-bold text-accent text-xl">
                {data?.totalRevenue} MMK
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        ©2026 Kandaw101Hotel Admin Dashboard. All rights reserved.
      </div>
    </div>
  );
};

export default Dashboard;
