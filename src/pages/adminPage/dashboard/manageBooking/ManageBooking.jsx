import { useMemo, useState } from "react";
import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Loading from "../../../../components/Loading";
import PageHeader from "../../components/PageHeader";

import {
  useFetchBookingsAllQuery,
  useUpdateBookingStatusMutation,
} from "../../../../redux/features/booking/bookingApi";

const card =
  "bg-primary/25 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl";

const btn =
  "px-2  cursor-pointer py-1 rounded text-white text-sm transition hover:opacity-80";

const ManageBooking = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetchBookingsAllQuery();

  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const [search, setSearch] = useState("");

  const bookings = Array.isArray(data)
    ? data
    : data?.bookings || data?.data || [];

  // FILTER
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const guest =
        `${b.guest?.firstName || ""} ${b.guest?.lastName || ""}`.toLowerCase();

      const room = b.room?.name?.toLowerCase() || "";

      return (
        guest.includes(search.toLowerCase()) ||
        room.includes(search.toLowerCase())
      );
    });
  }, [bookings, search]);

  // STATS
  const stats = {
    total: bookings.length,

    confirmed: bookings.filter((b) => b.bookingStatus === "confirmed").length,

    pending: bookings.filter((b) => b.bookingStatus === "pending").length,

    cancelled: bookings.filter((b) => b.bookingStatus === "cancelled").length,
  };

  // STATUS STYLE
  const statusStyle = {
    confirmed: "bg-green-500/15 text-green-400 border border-green-500/20",

    pending: "bg-yellow-500/15 text-yellow-300 border border-yellow-500/20",

    cancelled: "bg-red-500/15 text-red-400 border border-red-500/20",
  };

  // UPDATE STATUS
  const handleStatus = async (id, bookingStatus, paymentStatus = null) => {
    try {
      await updateBookingStatus({
        id,
        bookingStatus,
        paymentStatus,
      }).unwrap();

      alert("Updated successfully");
    } catch (err) {
      alert(err?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-center py-10 text-red-400">
        Failed to load bookings
      </div>
    );
  }

  return (
    <section className="min-h-screen  rounded-4xl bg-gray-600 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <PageHeader
          title="Manage Bookings"
          subtitle="Track reservations and hotel occupancy."
        />

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 my-8">
          {[
            {
              title: "Total",
              value: stats.total,
              icon: <FaUsers />,
              color: "text-white",
            },

            {
              title: "Confirmed",
              value: stats.confirmed,
              icon: <FaCheckCircle />,
              color: "text-green-400",
            },

            {
              title: "Pending",
              value: stats.pending,
              icon: <FaClock />,
              color: "text-yellow-300",
            },

            {
              title: "Cancelled",
              value: stats.cancelled,
              icon: <FaTimesCircle />,
              color: "text-red-400",
            },
          ].map((item, i) => (
            <div key={i} className={card}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary/60 text-sm">{item.title}</p>

                  <h2 className={`text-4xl font-black mt-2 ${item.color}`}>
                    {item.value}
                  </h2>
                </div>

                <div className="text-3xl text-white/70">{item.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH */}
        <div className={`${card} mb-8`}>
          <div className="flex items-center gap-3 bg-black/20 rounded-2xl px-4 py-3">
            <FaSearch className="text-white/40" />

            <input
              type="text"
              placeholder="Search guest or room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border border-white/10 overflow-hidden rounded-2xl">
            <thead className="bg-black/20 text-left">
              <tr>
                <th className="p-4">Guest</th>
                <th className="p-4">Room</th>
                <th className="p-4">Dates</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  {/* GUEST */}
                  <td className="p-4">
                    <p className="text-white font-semibold">
                      {booking.guest?.firstName} {booking.guest?.lastName}
                    </p>

                    <p className="text-xs text-gray-400">
                      #{booking.bookingCode}
                    </p>
                  </td>

                  {/* ROOM */}
                  <td className="p-4 text-gray-300">{booking.room?.name}</td>

                  {/* DATES */}
                  <td className="p-4 text-gray-300">
                    {new Date(booking.stay?.checkIn).toLocaleDateString()}
                    {" - "}
                    {new Date(booking.stay?.checkOut).toLocaleDateString()}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        statusStyle[booking.bookingStatus]
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/confirmation/${booking._id}`)}
                      className={`${btn} bg-primary`}
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleStatus(booking._id, "confirmed", "paid")
                      }
                      className={`${btn} bg-blue-600`}
                    >
                      Paid
                    </button>

                    {/* PENDING */}
                    {booking.bookingStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatus(booking._id, "confirmed")}
                          className={`${btn} bg-green-600`}
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() => handleStatus(booking._id, "cancelled")}
                          className={`${btn} bg-red-600`}
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* CANCELLED */}
                    {booking.bookingStatus === "cancelled" && (
                      <button
                        onClick={() => handleStatus(booking._id, "confirmed")}
                        className={`${btn} bg-emerald-600`}
                      >
                        Restore
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-10">
          <p className="text-xs tracking-[3px] text-white/30 uppercase">
            ©2026 Kandaw101Hotel
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManageBooking;
