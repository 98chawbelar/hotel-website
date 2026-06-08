import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { hotelMap } from "../assets/assets";
import { useFetchRoomByIdQuery } from "../redux/features/rooms/roomsApi";
import RoomHeader from "../components/rooms/RoomHeader";
import {
  FaBed,
  FaMoneyBillWave,
  FaRulerCombined,
  FaUserFriends,
} from "react-icons/fa";

const RoomDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: room, isLoading, error } = useFetchRoomByIdQuery(id);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);

  const today = new Date().toISOString().split("T")[0];

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

  const { totalPrice, monthlyPrice, days } = useMemo(() => {
    if (!checkIn || !checkOut || !room)
      return { totalPrice: 0, monthlyPrice: 0, days: 0 };

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const days = (end - start) / (1000 * 60 * 60 * 24);

    if (days <= 0) return { totalPrice: 0, monthlyPrice: 0, days: 0 };

    let total = days * room.price;
    if (days >= 7) total -= 10000;

    return { totalPrice: total, monthlyPrice: room.price * 30 - 50000, days };
  }, [checkIn, checkOut, room]);

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
      <RoomHeader room={room} />

      <div className="bg-primary text-white min-h-screen">
        {/* BACK BUTTON */}
        <div className="max-w-6xl mx-auto px-6 pt-8">
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
                src={room.image}
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
                  Max Adults: {Math.max(...room.capacity.adults)}
                </span>
                <span className="px-2 py-2 text-nowrap text-xs md:text-sm">
                  Max Childs: {Math.max(...room.capacity.child)}
                </span>
              </div>
              <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center gap-2">
                <FaRulerCombined className="text-accent text-2xl md:text-3xl" />
                <span className="text-sm md:text-base">{room.size}</span>
              </div>
              <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center gap-2">
                <FaMoneyBillWave className="text-accent text-2xl md:text-3xl" />
                <span className="text-sm md:text-base">
                  {room.price.toLocaleString()} MMK
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h2 className="text-xl font-semibold mb-2">About Room</h2>
              <p className="text-gray-400 leading-7">{room.description}</p>
            </div>

            {/* FACILITIES */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-300">
                {room.facilities.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <span>•</span>
                      <span>{item.title}</span>
                    </div>
                  );
                })}
              </div>
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
            <div className="bg-green-500/10 rounded-xl px-4 py-3">
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
                  {[...Array(room.capacity.adults)].map((_, i) => (
                    <option key={i} value={i}>
                      {i} {i === 0 ? "Adult" : "Adults"}
                    </option>
                  ))}
                </select>

                {/* CHILDREN */}
                <select
                  value={child}
                  onChange={(e) => setChild(Number(e.target.value))}
                  className="w-full p-2 rounded text-black"
                >
                  {[...Array(room.capacity.child + 1)].map((_, i) => (
                    <option key={i} value={i}>
                      {i} {i === 1 ? "Child" : "Children"}
                    </option>
                  ))}
                </select>

                {/* PRICE SECTION */}
                <div className="pt-3 space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Daily Rate</p>
                    <p className="font-semibold">
                      {room.price.toLocaleString()} MMK
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-400">Monthly Rate</p>
                    <p className="font-semibold">
                      {monthlyPrice.toLocaleString()} MMK
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <p className="text-sm text-gray-400">Total Price</p>
                    <p className="text-2xl font-bold text-accent">
                      {totalPrice > 0
                        ? `${totalPrice.toLocaleString()} MMK`
                        : "Select dates"}
                    </p>
                    {days >= 7 && (
                      <p className="text-green-500 text-xs mt-1">
                        Weekly discount applied
                      </p>
                    )}
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => navigate("/booking")}
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
