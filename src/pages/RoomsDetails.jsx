import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { hotelMap } from "../assets/assets";
import { useFetchRoomByIdQuery } from "../redux/features/rooms/roomsApi";
import { useCalculatePricePreviewMutation } from "../redux/features/booking/bookingApi";

import {
  FaBed,
  FaMoneyBillWave,
  FaRulerCombined,
  FaUserFriends,
} from "react-icons/fa";
import getBaseUrl from "../utils/baseURL";
import { useFetchFacilitiesQuery } from "../redux/features/facilities/facilitiesApi";
import { useFetchExtraFacilitiesQuery } from "../redux/features/extrafacilities/extraFacilitiesApi";

const RoomDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: room, isLoading, error } = useFetchRoomByIdQuery(id);
  const { data: extrafacilitiesData, isLoading: extrafacilitiesLoading } =
    useFetchExtraFacilitiesQuery();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);

  const [calculatePricePreview, { data: priceData }] =
    useCalculatePricePreviewMutation();

  const today = new Date().toISOString().split("T")[0];

  const BASE_URL = getBaseUrl();

  const getImageUrl = (image) => {
    if (!image) {
      return "https://placehold.co/600x400";
    }

    if (Array.isArray(image)) {
      image = image[0];
    }

    if (typeof image === "object") {
      image = image.url || image.path || image.secure_url || "";
    }

    if (!image) {
      return "https://placehold.co/600x400";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${BASE_URL}/${image.replace(/^\/+/, "")}`;
  };

  const policies = [
    "Check-in: 12:00 PM",
    "Check-out: Before 12:00 PM",
    "Deposit: 3,000 MMK",
    "Damage responsibility applies",
  ];

  const dateInputs = [
    { value: checkIn, onChange: (e) => setCheckIn(e.target.value), min: today },
    {
      value: checkOut,
      onChange: (e) => setCheckOut(e.target.value),
      min: checkIn || today,
    },
  ];

  useEffect(() => {
    if (checkIn && checkOut && room?._id) {
      calculatePricePreview({
        roomId: room._id,
        checkIn,
        checkOut,
        extrasTotal: 0,
      });
    }
  }, [checkIn, checkOut, room?._id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-2xl">
        Error fetching room details
      </div>
    );
  }
  if (!room)
    return (
      <div className="text-center py-20 text-red-600 text-2xl">
        Room Not Found
      </div>
    );

  return (
    <>
      <div className="bg-primary  text-white min-h-screen">
        {/* BACK BUTTON */}
        <div className="max-w-6xl  mx-auto px-6 pt-20">
          <Link
            to="/rooms"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            ← Back to Rooms
          </Link>
        </div>

        {/* MAIN WRAPPER */}
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* LEFT CONTENT */}
          <div className="md:col-span-2 space-y-10">
            {/* IMAGE */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src={getImageUrl(room.images)}
                alt={room.name}
                className="w-full h-120 object-cover"
              />
            </div>

            {/* TITLE */}
            <div>
              <h1 className="text-4xl font-semibold">{room.name}</h1>
              <p className="text-gray-400 mt-2">
                Elegant comfort designed for your perfect stay
              </p>
            </div>

            {/* ROOM INFO */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-gray-300">
              <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center gap-2">
                <FaBed className="text-accent text-2xl md:text-3xl" />
                <span className="text-sm md:text-base">Beds: {room.beds}</span>
              </div>
              <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center gap-2">
                <FaUserFriends className="text-accent text-2xl md:text-3xl" />
                <span className=" px-2 py-2 text-xs md:text-sm text-nowrap">
                  Max Adults: {room.capacity?.adults || 0}
                </span>
                <span className="px-2 py-2 text-nowrap text-xs md:text-sm">
                  Max Childs: {room.capacity?.child || 0}
                </span>
              </div>
              <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center gap-2">
                <FaRulerCombined className="text-accent text-2xl md:text-3xl" />
                <span className="text-sm md:text-base">{room.size}</span>
              </div>
              <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center gap-2">
                <FaMoneyBillWave className="text-accent text-2xl md:text-3xl" />
                <span className="text-sm md:text-base">
                  {room.basePrice.toLocaleString()} Ks
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h2 className="text-xl font-semibold mb-2">About Room</h2>
              <p className="text-gray-400 leading-7">{room.description}</p>
            </div>

            {/* HOTEL POLICIES */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Hotel Policies</h2>
              <div className="text-gray-400 text-sm space-y-1">
                {policies.map((item, index) => (
                  <p key={index}>• {item}</p>
                ))}
              </div>
            </div>

            {/* GOOGLE MAP */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Hotel Location</h2>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  src={hotelMap}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* RIGHT BOOKING PANEL */}
          <div className="md:col-span-1 self-start sticky top-5">
            <div className="bg-secondary/25 rounded-xl px-4 py-3">
              <div className="bg-transparent p-3 space-y-3 w-full">
                <h2 className="text-lg text-center font-bold">Reserve Room</h2>

                {/* DATE INPUTS */}
                {dateInputs.map((input, index) => (
                  <input
                    key={index}
                    type="date"
                    min={input.min}
                    value={input.value}
                    onChange={input.onChange}
                    className="w-full p-2 rounded text-black"
                  />
                ))}

                {/* ADULTS */}
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full p-2 rounded text-black"
                >
                  {Array.from({ length: room.capacity?.adults }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "Adult" : "Adults"}
                    </option>
                  ))}
                </select>

                {/* CHILDREN */}
                <select
                  value={child}
                  onChange={(e) => setChild(Number(e.target.value))}
                  className="w-full p-2 rounded text-black"
                >
                  {Array.from({ length: room.capacity?.child }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "Child" : "Childs"}
                    </option>
                  ))}
                </select>

                {/* PRICE SECTION */}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nights</span>
                    <span>{priceData?.nights || 0}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{priceData?.subtotal?.toLocaleString() || 0} Ks</span>
                  </div>

                  {priceData?.weeklyDiscount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Weekly Discount</span>
                      <span>
                        -{priceData.weeklyDiscount.toLocaleString()} Ks
                      </span>
                    </div>
                  )}

                  {priceData?.monthlyDiscount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Monthly Discount</span>
                      <span>
                        -{priceData.monthlyDiscount.toLocaleString()} Ks
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      {priceData?.totalPrice?.toLocaleString() || 0} Ks
                    </span>
                  </div>
                </div>
                {/* BUTTON */}
                <button
                  onClick={() =>
                    navigate(
                      `/booking?roomId=${room._id}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&child=${child}`,
                    )
                  }
                  disabled={!checkIn || !checkOut}
                  className="w-full bg-accent hover:bg-accent/60 py-3 rounded-lg disabled:bg-accent/30"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
