import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import {
  useCancelBookingMutation,
  useFetchBookingsByEmailQuery,
} from "../redux/features/booking/bookingApi";
import getBaseUrl from "../utils/baseURL";
import EmptyState from "./adminPage/components/EmptyState";

const cardStyle =
  "bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-accent/30 transition";

const sectionTitle = "text-2xl font-bold text-secondary mb-5";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const BASE_URL = getBaseUrl();

  const { data, isLoading, isError } = useFetchBookingsByEmailQuery(
    currentUser?.email,
    {
      skip: !currentUser?.email,
    },
  );

  const [cancelBooking] = useCancelBookingMutation();
  const [cancelTarget, setCancelTarget] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const bookings = Array.isArray(data)
    ? data
    : data?.bookings || data?.data || [];

  const statusStyle = {
    confirmed:
      "bg-emerald-500/10  text-emerald-400 border border-emerald-500/20",

    cancelled: "bg-red-500/10 text-red-400 border border-red-500/20",

    checked_in: "bg-blue-500/10 text-blue-400 border border-blue-500/20",

    pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  };

  // FIXED IMAGE FUNCTION
  const getImage = (room) => {
    let image = room?.images?.[0];

    if (!image) {
      return "https://placehold.co/600x400";
    }

    // object image support
    if (typeof image === "object") {
      image =
        image.url || image.path || image.secure_url || image.filename || "";
    }

    // fallback
    if (!image) {
      return "https://placehold.co/600x400";
    }

    // full url
    if (image.startsWith("http")) {
      return image;
    }

    // local uploads
    return `${BASE_URL}/${image.replace(/^\/+/, "")}`;
  };

  const handleCancelClick = async (booking) => {
    const checkInDate = new Date(booking.stay?.checkIn);
    const now = new Date();

    const diffDays = (checkInDate - now) / (1000 * 60 * 60 * 24);

    setCancelTarget(booking);

    // ⚠️ WARNING IF LESS THAN 7 DAYS
    const warningText =
      diffDays < 7
        ? "⚠️ You are cancelling within 7 days of check-in. Cancellation may be subject to penalty."
        : "Are you sure you want to cancel this booking?";

    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: warningText,
      icon: diffDays < 7 ? "warning" : "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel It",
      cancelButtonText: "Keep Booking",
    });

    if (!result.isConfirmed) return;

    try {
      await cancelBooking(booking._id).unwrap();

      await Swal.fire({
        title: "Cancelled!",
        text: "Your booking has been cancelled successfully.",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err?.data?.message || "Failed to cancel booking",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-white/20 border-t-accent rounded-full animate-spin mx-auto" />

          <p className="mt-5 text-secondary/70 text-lg">
            Loading your luxury bookings...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold text-red-400">
            Failed to load bookings
          </h2>

          <p className="text-secondary/70 mt-4">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-secondary px-4 sm:px-6 lg:px-10 py-14">
      <div className="max-w-7xl px-4 sm:px-8 lg:px-10 py-12 mt-20 mx-auto">
        {/* HERO */}

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-primary via-[#111c31] to-primary p-10 md:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.45)] mb-14">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <p className="uppercase tracking-[5px] text-accent text-sm">
              Luxury Guest Dashboard
            </p>

            <h1 className="text-5xl md:text-6xl font-black mt-5">
              Welcome Back
            </h1>

            <p className="mt-5 text-secondary/70 text-lg">
              Manage your reservations, room details, stay information, and
              premium services.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />

              <span className="text-secondary/80">{currentUser?.email}</span>
            </div>
          </div>
        </div>

        {/* EMPTY */}

        {bookings.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-14 text-center">
            <div className="text-7xl mb-6">🏨</div>

            <h2 className="text-4xl font-bold text-secondary">
              No bookings yet
            </h2>

            <p className="text-secondary/60 mt-5 text-lg">
              Your hotel reservations will appear here.
            </p>

            <button
              onClick={() => navigate("/rooms")}
              className="mt-8 px-8 py-4 rounded-full bg-accent text-black font-bold hover:scale-105 transition"
            >
              Explore Rooms
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {bookings.map((booking) => {
              const room = booking.room || {};

              const roomInfo = [
                ["Room Type", room.roomType || "Deluxe"],

                ["Bed Type", room.beds || "King Size Bed"],

                ["Room Size", `${room.size || "45"} m²`],

                ["View", room.view || "City View"],

                [
                  "Guests",
                  `${booking.stay?.adults || 0} Adults • ${
                    booking.stay?.children || 0
                  } Children`,
                ],

                ["Payment", booking.payment?.method || "Cash Payment"],

                [
                  "Check In",
                  new Date(booking.stay?.checkIn).toLocaleDateString(),
                ],

                [
                  "Check Out",
                  new Date(booking.stay?.checkOut).toLocaleDateString(),
                ],

                [
                  "Total Price",
                  `${booking.pricing?.totalPrice?.toLocaleString()} ${
                    booking.pricing?.currency
                  }`,
                ],
              ];

              return (
                <div
                  key={booking._id}
                  className="relative overflow-hidden rounded-[36px] bg-white/5 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
                >
                  {/* GOLD LINE */}

                  <div className="h-0.5 bg-accent" />

                  <div className="p-6 sm:p-8 lg:p-10">
                    {/* HEADER */}

                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                      <div>
                        <p className="uppercase tracking-[4px] text-secondary/50 text-xs">
                          Booking Reference
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-black text-accent mt-2">
                          {booking.bookingCode}
                        </h2>
                      </div>

                      <div className="mt-5 flex flex-col items-end gap-3">
                        {/* STATUS TEXT */}
                        <div
                          className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                            statusStyle[booking.bookingStatus]
                          }`}
                        >
                          {booking.bookingStatus === "confirmed" &&
                            "Booking Confirmed"}

                          {booking.bookingStatus === "pending" &&
                            "Booking Pending"}

                          {booking.bookingStatus === "cancelled" &&
                            "Booking Cancelled"}

                          {booking.bookingStatus === "checked_in" &&
                            "Checked In"}
                        </div>

                        {/* CANCEL BUTTON */}
                        {(booking.bookingStatus === "confirmed" ||
                          booking.bookingStatus === "pending") && (
                          <button
                            onClick={() => handleCancelClick(booking)}
                            className="px-4 py-2 cursor-pointer bg-red-500/20 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-500/10 transition duration-100"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>

                    {/* ROOM SECTION */}

                    <div className=" grid lg:grid-cols-[340px_1fr] gap-10">
                      {/* ROOM IMAGE */}

                      <div className="relative  mt-5 w-fit h-fit overflow-hidden rounded-3xl group">
                        <img
                          src={getImage(room)}
                          alt={room.name || "Room"}
                          className=" w-200 h-100  object-cover group-hover:scale-110 transition duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

                        <div className="absolute bottom-6 left-6">
                          <h3 className="text-3xl font-bold text-white">
                            {room.name || "Luxury Room"}
                          </h3>

                          <p className="text-secondary/80 mt-2">
                            {room.roomType || "Premium Suite"}
                          </p>
                        </div>
                      </div>

                      {/* DETAILS */}

                      <div>
                        <div className="mb-8">
                          <h3 className="text-3xl font-bold">
                            Room Information
                          </h3>

                          <p className="text-secondary/60 mt-3">
                            Complete details about your reservation.
                          </p>
                        </div>

                        {/* INFO GRID */}

                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                          {roomInfo.map(([label, value], index) => (
                            <div key={index} className={cardStyle}>
                              <p className="text-xs uppercase tracking-[3px] text-secondary/40">
                                {label}
                              </p>

                              <p
                                className={`mt-3 font-semibold text-lg ${
                                  label === "Total Price"
                                    ? "text-accent"
                                    : "text-secondary"
                                }`}
                              >
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* DESCRIPTION */}

                        {room.description && (
                          <div className="mt-10">
                            <h3 className={sectionTitle}>Room Description</h3>

                            <div
                              className={`${cardStyle} leading-8 text-secondary/70`}
                            >
                              {room.description}
                            </div>
                          </div>
                        )}

                        {/* FACILITIES */}
                        <div className="mt-10">
                          <h3 className={sectionTitle}>Room Facilities</h3>

                          {booking.extras?.length > 0 ? (
                            <div className="flex flex-wrap gap-3 mt-4">
                              {booking.extras.map((item, index) => (
                                <div
                                  key={index}
                                  className="px-5 py-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold"
                                >
                                  {item?.name || "Extra"}{" "}
                                  {item?.price ? `(+${item.price})` : ""}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <EmptyState
                              title="No Extras"
                              subtitle="No extra services were added for this booking."
                              buttonText="Browse Rooms"
                              onClick={() => navigate("/rooms")}
                            />
                          )}
                        </div>

                        {/* SPECIAL REQUEST */}

                        {booking.specialRequests && (
                          <div className="mt-10">
                            <h3 className={sectionTitle}>Special Requests</h3>

                            <div
                              className={`${cardStyle} leading-8 text-secondary/70`}
                            >
                              {booking.specialRequests}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
