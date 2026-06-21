import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useGetOrderByEmailQuery } from "./redux/features/booking/bookingApi";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetOrderByEmailQuery(
    currentUser?.email,
  );

  const bookings = Array.isArray(data)
    ? data
    : data?.bookings || data?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading bookings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load bookings
      </div>
    );
  }

  const statusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100";

      case "cancelled":
        return "text-red-600 bg-red-100";

      case "checked_in":
        return "text-blue-600 bg-blue-100";

      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold">My Dashboard</h1>

        <p className="mt-2 text-gray-600">
          Welcome {currentUser?.name || "Guest"}
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-5">My Bookings</h2>

          {bookings.length === 0 ? (
            <p className="text-gray-500">You don't have any bookings yet.</p>
          ) : (
            <div className="space-y-5">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border rounded-2xl p-5 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-semibold">
                        Booking Code:
                        <span className="ml-2">{booking.bookingCode}</span>
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyle(
                        booking.bookingStatus,
                      )}`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-gray-700">
                    <p>
                      Room:
                      <b className="ml-2">{booking.room?.name || "Room"}</b>
                    </p>

                    <p>
                      Guests:
                      <b className="ml-2">
                        {booking.stay?.adults || 0} Adult
                        {" • "}
                        {booking.stay?.child || 0} Child
                      </b>
                    </p>

                    <p>
                      Check In:
                      <b className="ml-2">
                        {new Date(booking.stay.checkIn).toLocaleDateString()}
                      </b>
                    </p>

                    <p>
                      Check Out:
                      <b className="ml-2">
                        {new Date(booking.stay.checkOut).toLocaleDateString()}
                      </b>
                    </p>

                    <p>
                      Payment:
                      <b className="ml-2">{booking.payment?.method}</b>
                    </p>

                    <p>
                      Total:
                      <b className="ml-2">
                        {booking.pricing?.totalPrice?.toLocaleString()}{" "}
                        {booking.pricing?.currency}
                      </b>
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/confirmation/${booking.bookingCode}`)
                      }
                      className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
