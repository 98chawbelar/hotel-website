import { useMemo, useState } from "react";
import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
  FaBan,
  FaSearch,
  FaCalendarAlt,
  FaBed,
} from "react-icons/fa";

import Loading from "../../../../components/Loading";
import PageHeader from "../../components/PageHeader";

import {
  useCancelBookingMutation,
  useUpdateBookingStatusMutation,
  useFetchBookingsAllQuery,
  useResendBookingEmailMutation,
} from "../../../../redux/features/booking/bookingApi";
import { useNavigate } from "react-router-dom";

const ManageBooking = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetchBookingsAllQuery();

  const [resendBookingEmail, { isLoading: isResending }] =
    useResendBookingEmailMutation();

  const [cancelBooking] = useCancelBookingMutation();

  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const [searchTerm, setSearchTerm] = useState("");

  const bookings = Array.isArray(data)
    ? data
    : data?.bookings || data?.data || [];

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const fullName =
        `${booking.guest?.firstName || ""} ${booking.guest?.lastName || ""}`.toLowerCase();

      const roomName = booking.room?.name?.toLowerCase() || "";

      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        roomName.includes(searchTerm.toLowerCase())
      );
    });
  }, [bookings, searchTerm]);

  const confirmedBookings = bookings.filter(
    (booking) => booking.bookingStatus?.toLowerCase() === "confirmed",
  ).length;

  const pendingBookings = bookings.filter(
    (booking) => booking.bookingStatus?.toLowerCase() === "pending",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.bookingStatus?.toLowerCase() === "cancelled",
  ).length;

  const handleCancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) return;

    try {
      await cancelBooking(id).unwrap();

      alert("Booking cancelled successfully");
    } catch (err) {
      console.error(err);

      alert("Failed to cancel booking");
    }
  };

  const handleStatusChange = async (id, bookingStatus) => {
    try {
      const result = await updateBookingStatus({
        id,
        bookingStatus,
      }).unwrap();

      console.log("Updated:", result);

      alert(`Booking ${bookingStatus} successfully`);
    } catch (error) {
      console.error("Update error:", error);

      alert(error?.data?.message || "Failed to update booking");
    }
  };

  const handleMarkPaid = async (booking) => {
    try {
      await updateBookingStatus({
        id: booking._id,
        bookingStatus: "confirmed",
        paymentStatus: "paid",
      }).unwrap();

      alert("Payment marked as PAID and booking confirmed");
    } catch (err) {
      console.log(err);
      alert(err?.data?.message || "Failed");
    }
  };

  const handleMarkPaidAndSendEmail = async (booking) => {
    try {
      const res = await updateBookingStatus({
        id: booking._id,
        paymentStatus: "paid",
      }).unwrap();

      // small delay ensures DB sync (important in some setups)
      await new Promise((r) => setTimeout(r, 300));

      await resendBookingEmail(booking._id).unwrap();

      alert("Paid + Email sent successfully");
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "Failed");
    }
  };
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-500/15 text-green-400 border border-green-500/20";

      case "pending":
        return "bg-yellow-500/15 text-yellow-300 border border-yellow-500/20";

      case "cancelled":
        return "bg-red-500/15 text-red-400 border border-red-500/20";

      default:
        return "bg-gray-500/15 text-gray-300 border border-gray-500/20";
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
    <section className="relative min-h-screen overflow-hidden rounded-xl bg-gray-600 px-4 sm:px-6 lg:px-8 py-8">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-175 bg-primary/20 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-400 mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <PageHeader
            title="Manage Bookings"
            subtitle="Track guest reservations, booking status, and hotel occupancy."
          />
        </div>

        {/* TOP STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-[28px] p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary/55 text-sm">Total Bookings</p>

                <h2 className="text-4xl font-black text-white mt-2">
                  {bookings.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FaUsers className="text-primary text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-[28px] p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary/55 text-sm">Confirmed</p>

                <h2 className="text-4xl font-black text-green-400 mt-2">
                  {confirmedBookings}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <FaCheckCircle className="text-green-400 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-[28px] p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary/55 text-sm">Pending</p>

                <h2 className="text-4xl font-black text-yellow-300 mt-2">
                  {pendingBookings}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
                <FaClock className="text-yellow-300 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-[28px] p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary/55 text-sm">Cancelled</p>

                <h2 className="text-4xl font-black text-red-400 mt-2">
                  {cancelledBookings}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <FaTimesCircle className="text-red-400 text-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-5 shadow-2xl mb-8">
          <div className="flex items-center gap-3 bg-black/20 rounded-2xl px-5 py-4">
            <FaSearch className="text-secondary/40 text-lg" />

            <input
              type="text"
              placeholder="Search guest or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-white placeholder:text-secondary/40"
            />
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="grid gap-2 lg:hidden">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-5 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {booking.guest?.firstName} {booking.guest?.lastName}
                  </h2>

                  <p className="text-secondary/50 text-sm mt-1">
                    Booking ID : #{booking.bookingCode}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-xs font-semibold ${getStatusStyle(
                    booking.bookingStatus,
                  )}`}
                >
                  {booking.bookingStatus}
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-secondary">
                  <FaBed className="text-primary" />

                  <span>{booking.room?.name}</span>
                  <FaCalendarAlt className="text-green-400" />

                  <span>
                    {new Date(booking.stay?.checkIn).toLocaleDateString()} -{" "}
                    {new Date(booking.stay?.checkOut).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-secondary"></div>
                <button
                  onClick={() => handleMarkPaid(booking)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Mark Paid
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => navigate(`/confirmation/${booking._id}`)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white"
                  >
                    <FaEye />
                    View
                  </button>

                  {booking.bookingStatus === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(booking._id, "confirmed")
                        }
                        className="px-4 py-2 rounded-xl bg-green-500 text-white"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(booking._id, "cancelled")
                        }
                        className="px-4 py-2 rounded-xl bg-red-500 text-white"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-[900px] border border-white/10 rounded-xl overflow-hidden">
            <thead className="bg-black/20 text-left">
              <tr>
                <th className="p-4">Guest</th>
                <th className="p-4">Room</th>
                <th className="p-4">Room No</th>
                <th className="p-4">Check In</th>
                <th className="p-4">Check Out</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Payment</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="p-4">
                    <p className="text-white font-semibold">
                      {booking.guest?.firstName} {booking.guest?.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      #{booking.bookingCode}
                    </p>
                  </td>

                  <td className="p-4 text-gray-300">{booking.room?.name}</td>

                  <td className="p-4 text-gray-300">
                    {booking.room?.roomNumber || "N/A"}
                  </td>

                  <td className="p-4 text-gray-300">
                    {new Date(booking.stay?.checkIn).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-gray-300">
                    {new Date(booking.stay?.checkOut).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                        booking.bookingStatus,
                      )}`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>

                  {/* PAYMENT */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleMarkPaid(booking)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Mark Paid
                    </button>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/confirmation/${booking._id}`)}
                      className="px-3 py-1 bg-primary text-white rounded"
                    >
                      View
                    </button>

                    {booking.bookingStatus === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(booking._id, "confirmed")
                          }
                          className="px-3 py-1 bg-green-600 text-white rounded"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange(booking._id, "cancelled")
                          }
                          className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center">
          <p className="text-secondary/35 text-xs tracking-[3px] uppercase">
            ©2026 Kandaw101Hotel Booking Management
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManageBooking;
