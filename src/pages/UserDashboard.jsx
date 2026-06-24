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
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";

      case "cancelled":
        return "bg-red-50 text-red-700 border border-red-200";

      case "checked_in":
        return "bg-blue-50 text-blue-700 border border-blue-200";

      default:
        return "bg-amber-50 text-amber-700 border border-amber-200";
    }
  };

  if (isLoading) {
    return (
      <div
        className="
       min-h-screen
       max-w-5xl
        flex
        items-center
        justify-center
        bg-secondary
        "
      >
        <div className="text-center">
          <div
            className="
            w-12
            h-12
            border-4
            border-slate-200
            border-t-accent
            rounded-full
            animate-spin
            mx-auto
            "
          />
          <p className="mt-4 text-slate-600 font-medium">
            Loading your bookings...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
       min-h-screen
      max-w-5xl
        flex
        items-center
        justify-center
        bg-secondary
        "
      >
        <div
          className="
          bg-white
          rounded-3xl
          p-8
          shadow-lg
          text-center
          "
        >
          <h2 className="text-xl font-bold text-red-600">
            Failed to load bookings
          </h2>

          <p className="text-slate-500 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10
      
     items-center
      
      bg-secondary/20
      py-16
     
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* HERO HEADER */}

        <div
          className="
          bg-primary
          text-white
          rounded-3xl
          p-10
          md:p-12
          mb-10
          shadow-2xl
          border
          border-white/10
          relative
          overflow-hidden
          "
        >
          <div
            className="
            absolute
            top-0
            right-0
            w-72
            h-72
            rounded-full
            bg-secondary/80
            opacity-10
            blur-4xl
            "
          />

          <div className="relative z-10">
            <h1
              className="
              text-4xl
              md:text-5xl
              text-secondary/80
              tracking-wide
              "
            >
              My Dashboard
            </h1>

            <p className="mt-4 text-slate-300 text-lg">
              Welcome back,
              <span className="ml-2 text-accent font-bold">
                {currentUser?.email}
              </span>
            </p>
          </div>
        </div>

        {/* EMPTY STATE */}

        {bookings.length === 0 ? (
          <div
            className="
            bg-secondary/40
            rounded-3xl
            shadow-2xl
            p-12
            text-center
            border-none
            "
          >
            <div className="text-6xl mb-4">🏨</div>

            <h2
              className="
              text-2xl
              font-bold
              text-primary
              "
            >
              No bookings yet
            </h2>

            <p className="text-slate-500 mt-3">
              Your hotel reservations will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="
                bg-gray-600
                rounded-[30px]
                border-0
                p-8
                hover:-translate-y-1
                hover:shadow-2xl
                transition-all
                duration-300
                "
              >
                {/* TOP */}

                <div
                  className="
                  
                  flex
                  flex-col
                  md:flex-row
                  justify-between
                  md:items-start
                  gap-5
                  "
                >
                  <div>
                    <p
                      className="
                      text-sm
                      uppercase
                      tracking-widest
                      text-white
                      "
                    >
                      Booking Code
                    </p>

                    <h2
                      className="
                      mt-1
                      text-2xl
                      font-black
                      text-accent
                      "
                    >
                      {booking.bookingCode}
                    </h2>
                  </div>

                  <span
                    className={`
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    font-bold
                    uppercase
                    tracking-wide
                    w-fit
                    ${statusStyle(booking.bookingStatus)}
                    `}
                  >
                    {booking.bookingStatus}
                  </span>
                </div>

                {/* GOLD ACCENT */}

                <div
                  className="
                  h-0.5
                  w-45
                  rounded-full
                  bg-accent
                  mt-2
                  mb-4
                  "
                />

                {/* DETAILS */}

                <div
                  className="
                  grid
                  md:grid-cols-2
                  lg:grid-cols-3
                  gap-6
                  border-t
                  
                  
                  border-slate-100
                  pt-8
                  "
                >
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      Room
                    </p>

                    <p className="font-semibold text-primary mt-1">
                      {booking.room?.name || "Room"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      Room Type
                    </p>

                    <p className="font-semibold text-primary mt-1">
                      {booking.room?.roomType || "Not assigned"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      Guests
                    </p>

                    <p className="font-semibold text-primary mt-1">
                      {booking.stay?.adults || 0} Adults •{" "}
                      {booking.stay?.children || 0} Children
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      Payment Method
                    </p>

                    <p className="font-semibold text-primary mt-1">
                      {booking.payment?.method || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      Check In
                    </p>

                    <p className="font-semibold text-primary mt-1">
                      {new Date(booking.stay?.checkIn).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      Check Out
                    </p>

                    <p className="font-semibold text-primary mt-1">
                      {new Date(booking.stay?.checkOut).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      Total Amount
                    </p>

                    <p
                      className="
                      font-bold
                      text-lg
                      text-accent
                      mt-1
                      "
                    >
                      {booking.pricing?.totalPrice?.toLocaleString()}{" "}
                      {booking.pricing?.currency}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
