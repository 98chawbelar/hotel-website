import getBaseUrl from "../../utils/baseURL";

const BookingSummary = ({
  selectedRoomData,
  checkIn,
  checkOut,
  adults,
  child,
  pricing,
}) => {
  const BASE_URL = getBaseUrl();

  const getImageUrl = (image) => {
    if (!image) return "https://placehold.co/600x400";

    if (Array.isArray(image)) {
      image = image[0];
    }

    if (typeof image === "object") {
      image = image.url || image.path || image.secure_url || "";
    }

    if (!image) return "https://placehold.co/600x400";

    if (image.startsWith("http")) {
      return image;
    }

    return `${BASE_URL}/${image.replace(/^\/+/, "")}`;
  };

  const basePrice = selectedRoomData?.basePrice || 0;

  const maxAdults = selectedRoomData?.capacity?.adults || 0;

  const maxChild = selectedRoomData?.capacity?.child || 0;

  const hasDates = checkIn && checkOut;

  const weeklyDiscount = Number(pricing?.weeklyDiscount) || 0;

  const monthlyDiscount = Number(pricing?.monthlyDiscount) || 0;

  const tax = Number(pricing?.taxAmount) || 0;

  const serviceFee = Number(pricing?.serviceFee) || 0;

  const extras = Number(pricing?.extrasTotal) || 0;

  const total = Number(pricing?.totalPrice) || 0;

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h3 className="text-2xl font-bold mb-6">Booking Summary</h3>

      {selectedRoomData?.images?.[0] && (
        <img
          src={getImageUrl(selectedRoomData.images)}
          alt={selectedRoomData.name}
          className="w-full h-52 object-cover rounded-xl mb-5"
        />
      )}

      <div className="mb-6">
        <h4 className="text-xl font-semibold">{selectedRoomData?.name}</h4>

        <p className="text-gray-400 text-sm mt-1">
          Max Guests: {maxAdults} Adult • {maxChild} Child
        </p>
      </div>

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

          <div className="flex justify-between text-xl font-bold">
            <span>Estimated Total</span>

            <span>{basePrice.toLocaleString()} Ks</span>
          </div>
        </div>
      ) : (
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
              {(pricing?.roomPrice || 0).toLocaleString()} {pricing?.currency}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>
              {(pricing?.subtotal || 0).toLocaleString()} {pricing?.currency}
            </span>
          </div>

          {weeklyDiscount > 0 && (
            <div className="flex justify-between text-green-400">
              <span>Weekly Discount</span>

              <span>
                -{weeklyDiscount.toLocaleString()} {pricing?.currency}
              </span>
            </div>
          )}

          {monthlyDiscount > 0 && (
            <div className="flex justify-between text-green-400">
              <span>Monthly Discount</span>

              <span>
                -{monthlyDiscount.toLocaleString()} {pricing?.currency}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Tax</span>

            <span>
              {tax.toLocaleString()} {pricing?.currency}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Service Fee</span>

            <span>
              {serviceFee.toLocaleString()} {pricing?.currency}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Extras</span>

            <span>
              {extras.toLocaleString()} {pricing?.currency}
            </span>
          </div>

          <hr className="border-white/10" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span>
              {total.toLocaleString()} {pricing?.currency}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
