import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { extraServices } from "../assets/assets";
import ExtraRequests from "../components/bookings/ExtraRequest";
import PaymentMethod from "../components/bookings/PaymentMethod";
import GuestDetails from "../components/bookings/GuestDetails";
import RoomSelector from "../components/bookings/RoomSelector";
import BookingSummary from "../components/bookings/BookingSummary";
import {
  useCreateBookingMutation,
  useCalculatePricePreviewMutation,
} from "../redux/features/booking/bookingApi";
import { useFetchAllRoomsQuery } from "../redux/features/rooms/roomsApi";

const Booking = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(1);

  const [selectedRoom, setSelectedRoom] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const [specialRequests, setSpecialRequests] = useState("");

  const [extras, setExtras] = useState([]);

  const [pricing, setPricing] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    agreePolicy: false,
  });
  const {
    data: rooms = [],
    isLoading: roomsLoading,
    isError,
  } = useFetchAllRoomsQuery();

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const [calculatePricePreview] = useCalculatePricePreviewMutation();

  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";

  const roomId = searchParams.get("roomId");

  const adults = Number(searchParams.get("adults") || 1);
  const child = Number(searchParams.get("child") || 0);

  const availableRooms = rooms.filter((room) => {
    const roomAdults = room?.capacity?.adults || 0;
    const roomChild = room?.capacity?.child || 0;

    return adults <= roomAdults && child <= roomChild;
  });

  const room =
    availableRooms.find((r) => String(r._id) === String(roomId)) ||
    availableRooms[0];

  const extrasTotal = extraServices.reduce((total, service) =>
    extras.includes(service.key) ? total + service.price : total,
  );

  const toggleExtra = (key) => {
    setExtras((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const selectedRoomData =
    availableRooms.find((room) => String(room._id) === String(selectedRoom)) ||
    availableRooms[0];

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBooking = async () => {
    try {
      if (!form.agreePolicy) {
        alert("Please agree to the policy");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const bookingData = {
        room: selectedRoomData._id,

        checkIn,
        checkOut,

        adults,
        child,

        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        country: form.country,

        specialRequests,

        paymentMethod,

        extras,

        bookingStatus: "pending",
      };

      const response = await createBooking(bookingData).unwrap();

      (navigate("/confirmation"),
        {
          state: {
            booking: response.booking,
            pricing: response.pricing,
          },
        });
    } catch (error) {
      console.error(error);

      alert(error?.data?.message || "Booking Failed");
    }
  };

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        if (!selectedRoom || !checkIn || !checkOut) return;

        const result = await calculatePricePreview({
          roomId: selectedRoom,
          checkIn,
          checkOut,
          extrasTotal,
        }).unwrap();

        setPricing(result);
      } catch (error) {
        console.error("Pricing Preview Error", error);
      }
    };

    fetchPricing();
  }, [selectedRoom, checkIn, checkOut, extrasTotal, calculatePricePreview]);

  useEffect(() => {
    if (room?._id && !selectedRoom) {
      setSelectedRoom(room._id);
    }
  }, [room, selectedRoom]);

  if (roomsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading rooms...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Failed to load rooms
      </div>
    );
  }

  if (!availableRooms.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No rooms available for selected guests
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen text-white px-3 sm:px-6 py-8 sm:py-12">
      <div className="max-w-xs sm:max-w-2xl md:max-w-3xl mt-10 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
            Complete Your Booking
          </h1>

          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Review your details and confirm your stay
          </p>

          {/* STEP INDICATOR */}
          <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
            {["Booking Options", "Guest Details"].map((label, i) => (
              <div key={i} className="flex items-center gap-1 sm:gap-2">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition ${
                    step === i + 1
                      ? "bg-accent text-white"
                      : step > i + 1
                        ? "bg-green-500 text-white"
                        : "bg-white/10 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>

                <span
                  className={`text-xs sm:text-sm hidden xs:block ${
                    step === i + 1 ? "text-white" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>

                {i < 1 && <div className="w-6 sm:w-8 h-px bg-white/20 mx-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          {/* LEFT SIDE */}
          <div className="space-y-4 sm:space-y-8">
            {step === 1 && (
              <>
                <ExtraRequests
                  extras={extras}
                  toggleExtra={toggleExtra}
                  specialRequests={specialRequests}
                  setSpecialRequests={setSpecialRequests}
                  extraServices={extraServices}
                />

                <PaymentMethod
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              </>
            )}

            {step === 2 && <GuestDetails form={form} setField={setField} />}
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4 sm:space-y-8">
            {step === 1 && (
              <RoomSelector
                rooms={availableRooms}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
              />
            )}

            <BookingSummary
              selectedRoomData={selectedRoomData}
              checkIn={checkIn}
              checkOut={checkOut}
              adults={adults}
              child={child}
              extras={extras}
              extraServices={extraServices}
              pricing={pricing}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 sm:mt-10 flex justify-between gap-4">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="border border-white/20 hover:border-white/50 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold transition"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={() => {
              if (step === 1) {
                setStep(2);
              } else {
                handleBooking();
              }
            }}
            className="bg-accent hover:bg-accent/70 text-white px-5 sm:px-10 py-3 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold transition"
          >
            {step === 1
              ? "Continue →"
              : isLoading
                ? "Booking..."
                : "Confirm Booking →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
