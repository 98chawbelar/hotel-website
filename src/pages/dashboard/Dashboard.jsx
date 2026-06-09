import { useEffect, useState } from "react";
import {
  FaBed,
  FaDoorOpen,
  FaDoorClosed,
  FaMoneyBillWave,
} from "react-icons/fa";

import RevenueChart from "./RevenueChart";
import Loading from "../../components/Loading";
import api from "../../api/client.api";

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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">
          Hotel Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back! Here’s your hotel overview.
        </p>
      </div>

      {/* Top Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Rooms */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-accent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Rooms</p>
              <h2 className="text-3xl font-bold text-primary mt-2">
                {data.totalRooms}
              </h2>
            </div>

            <div className="bg-primary/10 p-4 rounded-full">
              <FaBed className="text-2xl text-primary" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <h2 className="text-3xl font-bold text-primary mt-2">
                {data.totalRevenue} MMK
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-full">
              <FaMoneyBillWave className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        {/* Available Rooms */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Available Rooms</p>
              <h2 className="text-3xl font-bold text-primary mt-2">
                {data.availableRooms}
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-full">
              <FaDoorOpen className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        {/* Reserved Rooms */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Reserved Rooms</p>
              <h2 className="text-3xl font-bold text-primary mt-2">
                {data?.reservedRooms}
              </h2>
            </div>

            <div className="bg-red-100 p-4 rounded-full">
              <FaDoorClosed className="text-2xl text-red-600" />
            </div>
          </div>
        </div>
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
