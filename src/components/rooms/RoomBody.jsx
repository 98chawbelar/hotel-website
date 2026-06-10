import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPaypal, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import RoomCard from "./RoomCard";
import RoomGallery from "./RoomGallery";
import { useFetchAllRoomsQuery } from "../../redux/features/rooms/roomsApi";

const RoomBody = () => {
  const navigate = useNavigate();

  const [adults, setAdults] = useState(0);
  const [child, setChild] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // ================= ROOMS DATA =================
  const { data, isLoading, error } = useFetchAllRoomsQuery();
  const rooms = Array.isArray(data)
    ? data
    : Array.isArray(data?.rooms)
      ? data.rooms
      : [];

  // ================= ADULT OPTIONS =================
  const adultOptions = [1, 2, 3];
  // ================= CHILD OPTIONS =================
  const childOptions = [1, 2, 3];
  // ================= SEARCH =================
  const handleSearch = () => {
    // validate dates
    if (!checkIn || !checkOut) {
      alert("Please select check in and check out dates");
      return;
    }

    // validate checkout date
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check out date must be after check in");
      return;
    }

    // backend-ready query
    navigate(
      `/booking?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&chil=${child}`,
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-white text-2xl">
        Loading rooms...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-20 text-reed-500">
        Failed to load rooms
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-10">
      <div className="bg-primary shadow-md rounded-md overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="px-6 md:px-8 py-6 border-b border-gray-200">
          <p className="text-xl md:text-2xl font-serif text-[#f5f5f5] mb-4">
            Our Rooms
          </p>

          <p className="text-[#f5f5f5] text-md leading-7 max-w-xl">
            Discover modern luxury rooms designed for comfort, elegance, and
            relaxation at Kandaw 101 Hotel.
          </p>
        </div>

        {/* ================= BOOKING SEARCH ================= */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* CHECK IN */}
            <div className="flex-1">
              <label className="text-[#f5f5f5] font-medium block mb-3">
                Check In
              </label>

              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border-0 rounded-md px-2 py-3 outline-none bg-white cursor-pointer"
              />
            </div>

            {/* CHECK OUT */}
            <div className="flex-1">
              <label className="text-[#f5f5f5] font-medium block mb-3">
                Check Out
              </label>

              <input
                type="date"
                min={checkIn || new Date().toISOString().split("T")[0]}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border-0 rounded-md px-2 py-3 outline-none bg-white cursor-pointer"
              />
            </div>

            {/* ADULTS */}
            <div className="flex-1">
              <label className="text-[#f5f5f5] font-medium block mb-3">
                Adults
              </label>

              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full rounded-md px-2 py-3 bg-white text-gray-700 outline-none cursor-pointer"
              >
                {adultOptions.map((adult) => (
                  <option key={adult} value={adult}>
                    {adult} {adult === 1 ? "Adult" : "Adults"}
                  </option>
                ))}
              </select>
            </div>

            {/* CHILDREN */}
            <div className="flex-1">
              <label className="text-[#f5f5f5] font-medium block mb-3">
                Childs
              </label>

              <select
                value={child}
                onChange={(e) => setChild(Number(e.target.value))}
                className="w-full rounded-md px-2 py-3 bg-white text-gray-700 outline-none cursor-pointer"
              >
                {childOptions.map((childCount) => (
                  <option key={childCount} value={childCount}>
                    {childCount} {childCount === 1 ? "Child" : "Childs"}
                  </option>
                ))}
              </select>
            </div>

            {/* SEARCH BUTTON */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full lg:w-auto bg-accent/70 hover:bg-accent text-white px-6 py-3 rounded-md transition duration-100"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ================= ROOMS ================= */}
        <div className="p-6 md:p-8 space-y-8">
          {rooms.length > 0 ? (
            rooms.map((room) => <RoomCard key={room._id} room={room} />)
          ) : (
            <div className="text-center text-white py-10">
              No rooms available
            </div>
          )}
        </div>

        {/* ================= PAYMENT ================= */}
        <div className="border-t border-gray-600 bg-white px-6 md:px-8 py-10">
          <div className="flex flex-col items-center text-center gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold mb-2">
                Secure Payment Methods
              </h3>

              <p className="text-gray-600 mb-5">
                We support safe and trusted online payment systems.
              </p>

              <Link to="/payment" className="flex justify-center">
                <button className="flex items-center gap-2 bg-accent/70 hover:bg-accent text-white px-3 py-3 rounded-md transition duration-100">
                  <FaPaypal />
                  <span>Pay Now</span>
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-4 md:gap-6 text-2xl md:text-3xl">
              <FaPaypal className="text-blue-600 hover:scale-110 transition duration-300" />
              <FaCcVisa className="text-blue-700 hover:scale-110 transition duration-300" />
              <FaCcMastercard className="text-red-500 hover:scale-110 transition duration-300" />
            </div>
          </div>
        </div>

        {/* ================= GALLERY ================= */}
        <RoomGallery />
      </div>
    </div>
  );
};

export default RoomBody;
