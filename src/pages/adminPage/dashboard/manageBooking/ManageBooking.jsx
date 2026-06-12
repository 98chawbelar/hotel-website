import { HiOutlineSearch } from "react-icons/hi";
import {
  useCancelBookingMutation,
  useFetchBookingsAllQuery,
} from "../../../../redux/features/booking/bookingApi";

const ManageBooking = () => {
  const { data, isLoading, error } = useFetchBookingsAllQuery();
  console.log("Booking API Response", data);
  const [cancelBooking] = useCancelBookingMutation();

  const bookings = Array.isArray(data)
    ? data
    : data?.bookings || data?.data || [];

  if (isLoading) {
    return <div className="text-center py-10">Loading Bookings...</div>;
  }
  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load bookings
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Bookings</h2>

        <p className="text-gray-500 mt-1">
          View and manage all hotel reservations.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <p className="text-gray-500">Total Bookings</p>
          <h3 className="text-3xl font-bold text-primary mt-2">
            {bookings.length}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <p className="text-gray-500">Confirmed</p>
          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {
              bookings.filter(
                (booking) =>
                  booking.bookingStatus?.toLowerCase() === "confirmed",
              ).length
            }
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <p className="text-gray-500">Pending</p>
          <h3 className="text-3xl font-bold text-yellow-500 mt-2">
            {
              bookings.filter(
                (booking) => booking.bookingStatus?.toLowerCase() === "pending",
              ).length
            }
          </h3>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
        <div className="flex items-center bg-secondary rounded-xl px-4 py-3">
          <HiOutlineSearch className="text-xl text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Search guest name..."
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 lg:hidden">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">
                {" "}
                {booking.firstName} {booking.lastName}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  booking.bookingStatus === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {booking.bookingStatus}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Room:</strong> {booking.room?.name}
              </p>

              <p>
                <strong>Check In:</strong>
                {new Date(booking.checkIn).toLocaleDateString()}
              </p>

              <p>
                <strong>Check Out:</strong>
                {new Date(booking.checkOut).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg">
                View
              </button>

              <button className="flex-1 py-2 bg-red-500 text-white rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="p-4 text-left">Guest</th>
              <th className="p-4 text-left">Room</th>
              <th className="p-4 text-left">Check In</th>
              <th className="p-4 text-left">Check Out</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  {booking.firstName} {booking.lastName}
                </td>

                <td className="p-4">{booking.room?.name}</td>

                <td className="p-4">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.bookingStatus === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                      View
                    </button>

                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
