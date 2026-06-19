const BookingSummary = ({
  selectedRoomData,
  checkIn,
  checkOut,
  adults,
  child,
  pricing,
}) => {
  const basePrice = selectedRoomData?.basePrice || 0;

  const maxAdults = selectedRoomData?.capacity?.adults || 0;

  const maxChild = selectedRoomData?.capacity?.child || 0;

  const hasDates = checkIn && checkOut;

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h3 className="text-2xl font-bold mb-6">Booking Summary</h3>

      {/* ROOM IMAGE */}
      {selectedRoomData?.images?.[0] && (
        <img
          src={selectedRoomData.images[0]}
          alt={selectedRoomData?.title}
          className="w-full h-52 object-cover rounded-xl mb-5"
        />
      )}

      {/* ROOM TITLE */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold">
          {selectedRoomData?.title || "Luxury Room"}
        </h4>

        <p className="text-gray-400 text-sm mt-1">
          Max Guests: {maxAdults} Adult • {maxChild} Child
        </p>
      </div>

      {/* IF DATES NOT SELECTED */}
      {!hasDates ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Estimated Stay</span>
            <span>1 Night</span>
          </div>

          <div className="flex justify-between">
            <span>Room Price</span>

            <span>{basePrice.toLocaleString()} Ks</span>
          </div>

          <hr className="border-white/10" />

          <div className="flex justify-between text-xl font-bold">
            <span>Estimated Total</span>

            <span>{basePrice.toLocaleString()} Ks</span>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Select check-in and check-out dates to see exact pricing, taxes,
            discounts, and service fees.
          </p>
        </div>
      ) : (
        // FULL PRICING
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Check In</span>

            <span>{new Date(checkIn).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Check Out</span>

            <span>{new Date(checkOut).toLocaleDateString()}</span>
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

            <span>
              {pricing?.roomPrice?.toLocaleString() || 0}{" "}
              {pricing?.currency || "Ks"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>
              {pricing?.subtotal?.toLocaleString() || 0}{" "}
              {pricing?.currency || "Ks"}
            </span>
          </div>

          <div className="flex justify-between text-green-400">
            <span>Weekly Discount</span>

            <span>
              {(pricing?.weeklyDiscount ?? 0) > 0
                ? `-${pricing.weeklyDiscount.toLocaleString()}`
                : 0}{" "}
              Ks
            </span>
          </div>

          <div className="flex justify-between text-green-400">
            <span>Monthly Discount</span>

            <span>
              {(pricing?.monthlyDiscount ?? 0) > 0
                ? `-${pricing.monthlyDiscount.toLocaleString()}`
                : 0}{" "}
              Ks
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>

            <span>
              {(pricing?.taxAmount ?? 0).toLocaleString()}{" "}
              {pricing?.currency || "Ks"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Service Fee</span>

            <span>
              {(pricing?.serviceFee ?? 0).toLocaleString()}{" "}
              {pricing?.currency || "Ks"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Extras</span>

            <span>
              {(pricing?.extrasTotal ?? 0).toLocaleString()}{" "}
              {pricing?.currency || "Ks"}
            </span>
          </div>

          <hr className="border-white/10" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span>
              {(pricing?.totalPrice ?? 0).toLocaleString()}{" "}
              {pricing?.currency || "Ks"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
