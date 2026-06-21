import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFetchBookingsByEmailQuery } from "../redux/features/booking/bookingApi";

const UserDashboard = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetchBookingsByEmailQuery(
    currentUser?.email,
    {
      skip: !currentUser?.email,
    },
  );

  const bookings = Array.isArray(data)
    ? data
    : data?.bookings || data?.data || [];

  const statusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "checked_in":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (isLoading) {
    return (
      <div
        className="
      min-h-screen 
      flex 
      items-center 
      justify-center
      text-gray-600
      "
      >
        Loading your bookings...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
      min-h-screen 
      flex 
      items-center 
      justify-center 
      text-red-500
      "
      >
        Failed to load bookings
      </div>
    );
  }

  return (
    <div
      className="
    min-h-screen 
    bg-gray-100 
    py-16 
    px-4
    "
    >
      <div
        className="
      max-w-6xl 
      mx-auto
      "
      >
        {/* Header */}

        <div
          className="
        bg-white 
        rounded-3xl 
        shadow 
        p-8
        mb-8
        "
        >
          <h1
            className="
          text-4xl 
          font-black
          text-gray-800
          "
          >
            My Dashboard
          </h1>

          <p
            className="
          mt-2 
          text-gray-500
          "
          >
            Welcome back,
            <b className="ml-1">{currentUser?.name || "Guest"}</b>
          </p>
        </div>

        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div
              className="
            bg-white
            rounded-3xl
            shadow
            p-10
            text-center
            "
            >
              <h2
                className="
              text-xl
              font-bold
              text-gray-700
              "
              >
                No bookings yet
              </h2>

              <p
                className="
              text-gray-500
              mt-2
              "
              >
                Your hotel reservations will appear here.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          hover:shadow-xl
          transition
          "
              >
                {/* Top */}

                <div
                  className="
            flex
            justify-between
            items-start
            gap-4
            mb-6
            "
                >
                  <div>
                    <p
                      className="
                text-sm
                text-gray-400
                "
                    >
                      Booking Code
                    </p>

                    <h2
                      className="
                font-black
                text-xl
                text-gray-800
                "
                    >
                      {booking.bookingCode}
                    </h2>
                  </div>

                  <span
                    className={`
              px-4
              py-2
              rounded-full
              text-sm
              font-bold
              ${statusStyle(booking.bookingStatus)}
              `}
                  >
                    {booking.bookingStatus}
                  </span>
                </div>

                {/* Details */}

                <div
                  className="
            grid
            sm:grid-cols-2
            gap-5
            text-gray-700
            "
                >
                  <p>
                    🛏 Room:
                    <b className="ml-2">{booking.room?.name || "Room"}</b>
                  </p>

                  <p>
                    🔢 Room Number:
                    <b className="ml-2">
                      {booking.room?.roomNumber || "Not assigned"}
                    </b>
                  </p>

                  <p>
                    👥 Guests:
                    <b className="ml-2">
                      {booking.stay?.adults || 0}
                      Adult
                      {" • "}
                      {booking.stay?.children || 0}
                      Child
                    </b>
                  </p>

                  <p>
                    💳 Payment:
                    <b className="ml-2">{booking.payment?.method}</b>
                  </p>

                  <p>
                    📅 Check In:
                    <b className="ml-2">
                      {new Date(booking.stay.checkIn).toLocaleDateString()}
                    </b>
                  </p>

                  <p>
                    📅 Check Out:
                    <b className="ml-2">
                      {new Date(booking.stay.checkOut).toLocaleDateString()}
                    </b>
                  </p>

                  <p>
                    💰 Total:
                    <b className="ml-2">
                      {booking.pricing?.totalPrice?.toLocaleString()}{" "}
                      {booking.pricing?.currency}
                    </b>
                  </p>
                </div>

                {/* Action */}

                <div
                  className="
            mt-7
            "
                >
                  <button
                    onClick={() =>
                      navigate(`/confirmation/${booking.bookingCode}`)
                    }
                    className="
              w-full
              sm:w-auto
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-3
              rounded-2xl
              font-semibold
              transition
              "
                  >
                    View Booking Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
