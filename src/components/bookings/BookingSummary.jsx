const BookingSummary = ({
  selectedRoomData,
  checkIn,
  checkOut,
  adults,
  child,
  pricing,
}) => {
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Booking Summary</h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Room</span>
          <span>{selectedRoomData?.title}</span>
        </div>

        <div className="flex justify-between">
          <span>Check In</span>
          <span>{checkIn ? new Date(checkIn).toLocaleDateString() : "-"}</span>
        </div>

        <div className="flex justify-between">
          <span>Check Out</span>
          <span>
            {checkOut ? new Date(checkOut).toLocaleDateString() : "-"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Guests</span>
          <span>
            {adults} Adult • {child} Child
          </span>
        </div>

        <hr className="border-white/10" />

        <div className="flex justify-between">
          <span>Nights</span>
          <span>{pricing?.nights || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Room Price</span>
          <span>{pricing?.roomPrice?.toLocaleString() || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{pricing?.subtotal?.toLocaleString() || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>- {pricing?.discount?.toLocaleString() || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Extras</span>
          <span>{pricing?.extrasTotal?.toLocaleString() || 0}</span>
        </div>

        <hr className="border-white/10" />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>
            {pricing?.totalPrice?.toLocaleString() || 0}{" "}
            {pricing?.currency || "MMK"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
