import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { extraServices } from "../assets/assets";

import {
  useCreateBookingMutation,
  useCalculatePricePreviewMutation,
} from "../redux/features/booking/bookingApi";

import { useFetchAllRoomsQuery } from "../redux/features/rooms/roomsApi";

const useBooking = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(1);

  const [selectedRoom, setSelectedRoom] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [specialRequests, setSpecialRequests] = useState("");

  const [extras, setExtras] = useState([]);

  const [pricing, setPricing] = useState(null);

  const [showExtras, setShowExtras] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    agreePolicy: false,
  });

  const checkIn = searchParams.get("checkIn") || "";

  const checkOut = searchParams.get("checkOut") || "";

  const roomId = searchParams.get("roomId");

  const adults = Number(searchParams.get("adults") || 1);

  const child = Number(searchParams.get("child") || 0);

  const { data, isLoading: roomsLoading, isError } = useFetchAllRoomsQuery();

  const rooms = data?.rooms || data || [];

  const [createBooking, { isLoading: bookingLoading }] =
    useCreateBookingMutation();

  const [calculatePricePreview] = useCalculatePricePreviewMutation();

  const availableRooms = Array.isArray(rooms)
    ? rooms.filter((room) => {
        const roomAdults = room?.capacity?.adults || 0;

        const roomChild = room?.capacity?.child || 0;

        return adults <= roomAdults && child <= roomChild;
      })
    : [];

  const room =
    availableRooms.find((r) => String(r?._id) === String(roomId)) ||
    availableRooms?.[0];

  const selectedRoomData = availableRooms.find(
    (room) => String(room?._id) === String(selectedRoom),
  );

  const extrasTotal = extraServices.reduce(
    (total, service) =>
      extras.includes(service.key) ? total + service.price : total,
    0,
  );

  useEffect(() => {
    if (room?._id && !selectedRoom) {
      setSelectedRoom(room._id);
    }
  }, [room?._id, selectedRoom]);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        if (!selectedRoom) return;

        if (!checkIn || !checkOut) {
          setPricing(null);
          return;
        }

        const result = await calculatePricePreview({
          roomId: selectedRoom,
          checkIn,
          checkOut,
          extrasTotal,
        }).unwrap();
        console.log("PRICE RESPONSE FROM API:", result);

        setPricing(result);
      } catch (error) {
        console.error("Pricing Error:", error);
      }
    };

    fetchPricing();
  }, [selectedRoom, checkIn, checkOut, extrasTotal, calculatePricePreview]);

  const toggleExtra = (key) => {
    setExtras((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBooking = async () => {
    try {
      if (!form.agreePolicy) {
        alert("Please agree policy");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      if (!checkIn || !checkOut) {
        alert("Please select dates");
        return;
      }

      const selectedExtras = extraServices
        .filter((service) => extras.includes(service.key))
        .map((service) => ({
          name: service.label,
          price: service.price,
        }));

      const bookingData = {
        room: selectedRoomData._id,

        guest: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          country: form.country,
        },

        stay: {
          checkIn,
          checkOut,
          adults,
          child,
        },

        extras: selectedExtras,

        specialRequests,

        payment: {
          method: paymentMethod,
        },
      };

      const response = await createBooking(bookingData).unwrap();

      navigate(`/confirmation/${response.booking._id}`);
    } catch (error) {
      console.error(error);

      alert(error?.data?.message || "Booking Failed");
    }
  };

  return {
    // states
    step,
    setStep,

    selectedRoom,
    setSelectedRoom,

    paymentMethod,
    setPaymentMethod,

    specialRequests,
    setSpecialRequests,

    extras,
    toggleExtra,

    pricing,

    showExtras,
    setShowExtras,

    form,
    setField,

    // params
    checkIn,
    checkOut,
    adults,
    child,

    // room
    availableRooms,
    selectedRoomData,

    // api
    roomsLoading,
    isError,
    bookingLoading,

    // actions
    handleBooking,

    // data
    extraServices,
  };
};

export default useBooking;
