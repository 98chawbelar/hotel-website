import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  useCreateBookingMutation,
  useCalculatePricePreviewMutation,
  useFetchBookingsAllQuery,
} from "../redux/features/booking/bookingApi";

import { useFetchAllRoomsQuery } from "../redux/features/rooms/roomsApi";
import { useFetchFacilitiesQuery } from "../redux/features/facilities/facilitiesApi";
import { useFetchExtraFacilitiesQuery } from "../redux/features/extrafacilities/extraFacilitiesApi";

const useBooking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: facilitiesData } = useFetchFacilitiesQuery();
  const { data: extraFacilitiesData } = useFetchExtraFacilitiesQuery();

  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [extras, setExtras] = useState([]);
  const [pricing, setPricing] = useState(null);
  const [showExtras, setShowExtras] = useState(false);

  // ✅ SINGLE FORM STATE (SOURCE OF TRUTH)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
    agreePolicy: false,
  });

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // search params
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const roomId = searchParams.get("roomId");
  const adults = Number(searchParams.get("adults") || 1);
  const child = Number(searchParams.get("child") || 0);

  // data
  const { data, isLoading: roomsLoading, isError } = useFetchAllRoomsQuery();
  const { data: bookingData } = useFetchBookingsAllQuery();

  const rooms = Array.isArray(data) ? data : data?.rooms || [];
  const bookings = Array.isArray(bookingData)
    ? bookingData
    : bookingData?.bookings || [];

  const [createBooking, { isLoading: bookingLoading }] =
    useCreateBookingMutation();

  const [calculatePricePreview] = useCalculatePricePreviewMutation();

  const facilities =
    facilitiesData?.facilities || facilitiesData?.data || facilitiesData || [];

  const extraFacilities =
    extraFacilitiesData?.extraFacilities ||
    extraFacilitiesData?.data ||
    extraFacilitiesData ||
    [];

  const allExtras = [
    ...extraFacilities.map((item) => ({
      key: item.key,
      label: item.label,
      desc: item.desc,
      price: 0,
      type: "extra",
    })),
    ...facilities.map((f) => ({
      key: f._id,
      label: f.name,
      desc: f.description,
      price: f.price,
      type: "facility",
    })),
  ];

  // available rooms
  const availableRooms = rooms.filter((room) => {
    const roomStatus = room?.status?.toLowerCase();
    if (roomStatus === "reserved" || roomStatus === "booked") return false;

    const roomBookings = bookings.filter(
      (b) =>
        b?.room?._id === room?._id &&
        b?.bookingStatus?.toLowerCase() !== "cancelled",
    );

    const selectedCheckIn = new Date(checkIn);
    const selectedCheckOut = new Date(checkOut);

    const isBooked = roomBookings.some((b) => {
      const inDate = new Date(b?.stay?.checkIn);
      const outDate = new Date(b?.stay?.checkOut);

      return selectedCheckIn < outDate && selectedCheckOut > inDate;
    });

    return !isBooked;
  });

  const room =
    availableRooms.find((r) => String(r?._id) === String(roomId)) ||
    availableRooms?.[0];

  const selectedRoomData = availableRooms.find(
    (r) => String(r?._id) === String(selectedRoom),
  );

  useEffect(() => {
    if (room?._id && !selectedRoom) {
      setSelectedRoom(room._id);
    }
  }, [room?._id, selectedRoom]);

  const extrasTotal = allExtras.reduce(
    (total, item) => (extras.includes(item.key) ? total + item.price : total),
    0,
  );

  useEffect(() => {
    const fetchPricing = async () => {
      if (!selectedRoom || !checkIn || !checkOut) return;

      try {
        const res = await calculatePricePreview({
          roomId: selectedRoom,
          checkIn,
          checkOut,
          extrasTotal,
        }).unwrap();

        setPricing(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPricing();
  }, [selectedRoom, checkIn, checkOut, extrasTotal]);

  const toggleExtra = (key) => {
    setExtras((prev) =>
      prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key],
    );
  };

  // ✅ FIXED BOOKING
  const handleBooking = async () => {
    try {
      if (!form.agreePolicy) return alert("Please agree policy");
      if (!checkIn || !checkOut) return alert("Select dates");
      if (!selectedRoom) return alert("Select room");

      const selectedExtras = allExtras
        .filter((e) => extras.includes(e.key))
        .map((e) => ({
          name: e.label,
          price: e.price || 0,
        }));

      const payload = {
        room: selectedRoomData?._id,
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
        specialRequests: form.specialRequests, // ✅ FIX HERE
        payment: {
          method: paymentMethod,
        },
      };

      const res = await createBooking(payload).unwrap();

      alert("Booking Success!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Booking failed");
    }
  };

  return {
    step,
    setStep,

    selectedRoom,
    setSelectedRoom,

    paymentMethod,
    setPaymentMethod,

    extras,
    toggleExtra,

    pricing,
    showExtras,
    setShowExtras,

    form,
    setField,

    checkIn,
    checkOut,
    adults,
    child,

    availableRooms,
    selectedRoomData,

    roomsLoading,
    isError,
    bookingLoading,

    handleBooking,

    extraServices: allExtras,
  };
};

export default useBooking;
