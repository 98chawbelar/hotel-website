import useBooking from "../hooks/useBooking";

import ExtraRequests from "../components/bookings/ExtraRequest";
import PaymentMethod from "../components/bookings/PaymentMethod";
import GuestDetails from "../components/bookings/GuestDetails";
import RoomSelector from "../components/bookings/RoomSelector";
import BookingSummary from "../components/bookings/BookingSummary";
import PageHeader from "./adminPage/components/PageHeader";
import SubmitButton from "./adminPage/components/SubmitButton";

const Booking = () => {
  const booking = useBooking();

  if (booking.roomsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading rooms...
      </div>
    );
  }

  if (booking.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Failed to load rooms
      </div>
    );
  }

  if (!booking.availableRooms.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No rooms available
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen text-white px-3 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto mt-10">
        {/* HEADER */}
        <div className="mb-10">
          <PageHeader
            title={"Complete Your Booking"}
            subtitle={"Review your details and confirm your stay"}
          />
        </div>

        {/* MAIN */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* LEFT */}
          <div className="w-full xl:flex-1 space-y-6">
            {booking.step === 2 && (
              <GuestDetails form={booking.form} setField={booking.setField} />
            )}

            {/* ROOM */}
            {booking.step === 1 && (
              <RoomSelector
                rooms={booking.availableRooms}
                selectedRoom={booking.selectedRoom}
                setSelectedRoom={booking.setSelectedRoom}
              />
            )}

            {/* PAYMENT */}
            {booking.step === 1 && (
              <PaymentMethod
                paymentMethod={booking.paymentMethod}
                setPaymentMethod={booking.setPaymentMethod}
              />
            )}

            {/* EXTRAS */}
            {booking.step === 1 && (
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => booking.setShowExtras(!booking.showExtras)}
                  className="w-full flex items-center justify-between px-5 py-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold">Extra Services</h3>

                    <p className="text-sm text-gray-400">
                      Optional hotel services
                    </p>
                  </div>

                  <span className="text-2xl">
                    {booking.showExtras ? "−" : "+"}
                  </span>
                </button>

                {booking.showExtras && (
                  <div className="border-t border-white/10 p-5">
                    <ExtraRequests
                      extras={booking.extras}
                      toggleExtra={booking.toggleExtra}
                      specialRequests={booking.specialRequests}
                      setSpecialRequests={booking.setSpecialRequests}
                      extraServices={booking.extraServices}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="w-full xl:w-[420px] space-y-6 xl:sticky xl:top-24">
            <BookingSummary
              selectedRoomData={booking.selectedRoomData}
              checkIn={booking.checkIn}
              checkOut={booking.checkOut}
              adults={booking.adults}
              child={booking.child}
              pricing={booking.pricing}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex justify-between">
          {booking.step === 2 ? (
            <SubmitButton fullWidth={false} onClick={() => booking.setStep(1)}>
              ← Back
            </SubmitButton>
          ) : (
            <div />
          )}

          <SubmitButton
            fullWidth={false}
            loading={booking.bookingLoading}
            loadingText="Booking..."
            onClick={() => {
              if (booking.step === 1) {
                booking.setStep(2);
              } else {
                booking.handleBooking();
              }
            }}
          >
            {booking.step === 1
              ? "Continue →"
              : booking.bookingLoading
                ? "Booking..."
                : "Confirm Booking →"}
          </SubmitButton>
        </div>
      </div>
    </div>
  );
};

export default Booking;
