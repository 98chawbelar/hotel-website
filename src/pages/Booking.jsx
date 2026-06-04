import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { rooms, extraServices } from "../assets/assets";
import ExtraRequests from "../components/bookings/ExtraRequest";
import PaymentMethod from "../components/bookings/PaymentMethod";
import GuestDetails from "../components/bookings/GuestDetails";
import RoomSelector from "../components/bookings/RoomSelector";
import BookingSummary from "../components/bookings/BookingSummary";

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";

  const roomId = searchParams.get("roomId");

  const adults = searchParams.get("adults") || 1;
  const child = searchParams.get("child") || 0;

  const availableRooms = rooms.filter((room) => {
    return (
      room.capacity.adults.includes(Number(adults)) &&
      Number(child) <= Math.max(...room.capacity.child)
    );
  });

  const room =
    availableRooms.find((r) => r.id === Number(roomId)) || availableRooms[0];

  const days =
    checkIn && checkOut
      ? Math.max(0, (new Date(checkOut) - new Date(checkIn)) / 864e5)
      : 1;

  const [step, setStep] = useState(1);

  const [selectedRoom, setSelectedRoom] = useState(room?.id);

  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const [specialRequests, setSpecialRequests] = useState("");

  const [extras, setExtras] = useState([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequest: "",
    agreePolicy: false,
  });

  const toggleExtra = (key)=>{
    setExtras((prev)=>
    prev.includes(key)?
  prev.filter((item)=>item!==key):[...prev,key]
  )
  }

  const selectedRoomData =
    availableRooms.find((r) => r.id === selectedRoom) || availableRooms[0];

 const extrasTotal = extraServices.reduce((total, service) => {
  return extras.includes(service.key)
    ? total + service.price
    : total;
}, 0);

  const roomPrice =
    days > 0 ? days * selectedRoomData.price : selectedRoomData.price;
  const discount = days >= 7 ? 1000 : 0;
  const totalPrice = roomPrice + extrasTotal - discount;


  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    
  };

  
  if (!selectedRoomData) {
    return <div className="text-white p-10">No available rooms found.</div>;
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
              days={days}
              totalPrice={totalPrice}
              extras={extras}
              extraServices={extraServices}
              extrasTotal={extrasTotal}
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
                if (!form.agreePolicy) {
                  return alert("Please agree to the policy.");
                }

                // check login from token/localStorage/backend
                const token = localStorage.getItem("token");

                if (!token) {
                  navigate("/login");
                  return;
                }

                navigate("/confirmation");
              }
            }}
            className="bg-accent hover:bg-accent/70 text-white px-5 sm:px-10 py-3 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold transition"
          >
            {step === 1 ? "Continue →" : "Continue to Checkout →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
