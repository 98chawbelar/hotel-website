import {
  FaBed,
  FaUserFriends,
  FaRulerCombined,
  FaMoneyBillWave,
} from "react-icons/fa";

import { Card, CardTitle } from "./Shared";

const InfoChip = ({ icon: Icon, children }) => (
  <div className="bg-white/5 p-2 sm:p-3 rounded-lg flex items-center gap-2 text-xs sm:text-sm text-gray-300">
    <Icon className="text-accent shrink-0" />

    <span className="truncate">{children}</span>
  </div>
);

const BookingSummary = ({
  selectedRoomData,
  checkIn,
  checkOut,
  adults,
  child,
  days,
  totalPrice,
  extras,
  extrasTotal,
  extraServices,
}) => {
  return (
    <Card>
      <CardTitle>Booking Summary</CardTitle>

      {/* ROOM IMAGE */}
      <div className="rounded-xl overflow-hidden">
        <img
          src={selectedRoomData?.image}
          alt={selectedRoomData?.name}
          className="w-full h-32 sm:h-40 object-cover"
        />
      </div>

      {/* ROOM INFO */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <InfoChip icon={FaBed}>Beds: {selectedRoomData?.beds}</InfoChip>

        <InfoChip icon={FaUserFriends}>
          Max {Math.max(...(selectedRoomData?.capacity?.adults || [0]))} Adults
          · {Math.max(...(selectedRoomData?.capacity?.child || [0]))} Child
        </InfoChip>

        <InfoChip icon={FaRulerCombined}>{selectedRoomData?.size}</InfoChip>

        <InfoChip icon={FaMoneyBillWave}>
          {selectedRoomData?.price?.toLocaleString()} MMK
        </InfoChip>
      </div>

      {/* BOOKING DETAILS */}
      <div className="border-t border-white/10 pt-3 space-y-2 text-xs sm:text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Check In</span>

          <span>
            {checkIn ? `${checkIn} • ${selectedRoomData?.checkIn}` : "—"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Check Out</span>

          <span>
            {checkOut ? `${checkOut} • ${selectedRoomData?.checkOut}` : "—"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Guests</span>

          <span className="text-right">
            {Number(adults || 0)} Adults . {""}
            
            {Number(child || 0)} Child
            
          </span>
        </div>

        <div className="flex justify-between">
          <span>Duration</span>

          <span>
            {days} Night{days !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* EXTRA SERVICES */}
      {extrasTotal > 0 && (
  <div className="border-t border-white/10 pt-3 space-y-2 text-xs sm:text-sm text-gray-300">
    <p className="font-semibold text-white">
      Extra Services
    </p>

    {extraServices?.map((service) => {
      if (!extras.includes(service.key)) return null;

      return (
        <div
          key={service.key}
          className="flex justify-between"
        >
          <span>{service.label}</span>

          <span>
            +{service.price.toLocaleString()} MMK
          </span>
        </div>
      );
    })}
  </div>
)}

      {/* TOTAL */}
      <div className="border-t border-white/10 pt-3">
        <div className="flex justify-between text-base sm:text-lg font-bold text-accent">
          <span>Total</span>

          <span>{totalPrice?.toLocaleString()} MMK</span>
        </div>
      </div>
    </Card>
  );
};

export default BookingSummary;
