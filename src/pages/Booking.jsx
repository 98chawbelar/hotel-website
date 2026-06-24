import useBooking from "../hooks/useBooking";

import ExtraRequests from "../components/bookings/ExtraRequest";
import PaymentMethod from "../components/bookings/PaymentMethod";
import GuestDetails from "../components/bookings/GuestDetails";
import RoomSelector from "../components/bookings/RoomSelector";
import BookingSummary from "../components/bookings/BookingSummary";

import PageHeader from "./adminPage/components/PageHeader";
import SubmitButton from "./adminPage/components/SubmitButton";

import { useNavigate, useSearchParams } from "react-router-dom";

const Booking = () => {
  const booking = useBooking();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  // SEARCH PARAMS

  const checkIn = searchParams.get("checkIn");

  const checkOut = searchParams.get("checkOut");

  const adults = Number(searchParams.get("adults")) || 1;

  const child = Number(searchParams.get("child")) || 0;

  // LOADING

  if (booking.roomsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-white">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-5"></div>

          <h2 className="text-2xl font-bold">Loading Rooms...</h2>
        </div>
      </div>
    );
  }

  // ERROR

  if (booking.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-400 mb-4">
            Failed To Load Rooms
          </h2>

          <p className="text-white/60">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  // NO AVAILABLE ROOMS

  if (!booking.availableRooms.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-white px-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 max-w-lg w-full text-center">
          <h2 className="text-4xl font-bold mb-4">No Available Rooms</h2>

          <p className="text-white/60 mb-8 leading-7">
            All rooms are already booked for your selected dates.
          </p>

          <div className="space-y-2 text-left bg-black/20 rounded-2xl p-5">
            <p>
              <span className="text-white/50">Check In :</span> {checkIn}
            </p>

            <p>
              <span className="text-white/50">Check Out :</span> {checkOut}
            </p>

            <p>
              <span className="text-white/50">Adults :</span> {adults}
            </p>

            <p>
              <span className="text-white/50">Children :</span> {child}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-8 bg-accent hover:opacity-90 transition px-6 py-3 rounded-xl"
          >
            ← Back To Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen text-white px-3 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto mt-10">
        {/* HEADER */}

        <div className="mb-10">
          <PageHeader
            title="Complete Your Booking"
            subtitle="Choose your room and confirm your hotel reservation"
          />
        </div>

        {/* BOOKING INFO */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <p className="text-white/50 text-sm mb-1">Check In</p>

              <h3 className="font-semibold">{checkIn}</h3>
            </div>

            <div>
              <p className="text-white/50 text-sm mb-1">Check Out</p>

              <h3 className="font-semibold">{checkOut}</h3>
            </div>

            <div>
              <p className="text-white/50 text-sm mb-1">Adults</p>

              <h3 className="font-semibold">{adults}</h3>
            </div>

            <div>
              <p className="text-white/50 text-sm mb-1">Children</p>

              <h3 className="font-semibold">{child}</h3>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* LEFT */}

          <div className="w-full xl:flex-1 space-y-6">
            {/* ROOM SELECTOR */}

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

            {/* EXTRA SERVICES */}

            {booking.step === 1 && (
              <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => booking.setShowExtras(!booking.showExtras)}
                  className="w-full flex items-center justify-between px-6 py-5"
                >
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">Extra Services</h3>

                    <p className="text-sm text-white/50 mt-1">
                      Add optional hotel services
                    </p>
                  </div>

                  <span className="text-3xl">
                    {booking.showExtras ? "−" : "+"}
                  </span>
                </button>

                {booking.showExtras && (
                  <div className="border-t border-white/10 p-6">
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

            {/* GUEST DETAILS */}

            {booking.step === 2 && (
              <GuestDetails form={booking.form} setField={booking.setField} />
            )}
          </div>

          {/* RIGHT */}

          <div className="w-full xl:w-105 space-y-6 xl:sticky xl:top-24">
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

        <div className="mt-10 flex  justify-between ">
          <SubmitButton
            fullWidth={false}
            onClick={() => {
              if (booking.step === 2) {
                booking.setStep(1);
              } else {
                navigate(-1);
              }
            }}
          >
            ← Back
          </SubmitButton>

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
