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

  const { data: facilitiesData } = useFetchFacilitiesQuery();
  const { data: extraFacilitiesData } = useFetchExtraFacilitiesQuery();

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

  const facilities =
    facilitiesData?.facilities || facilitiesData?.data || facilitiesData || [];

  const extraFacilities =
    extraFacilitiesData?.extraFacilities ||
    extraFacilitiesData?.data ||
    extraFacilitiesData ||
    [];

  const freeFacilities = facilities.map((facility) => ({
    key: facility._id,
    label: facility.name,
    desc: facility.description,
    price: 0,
    type: "facility",
  }));

  const paidExtras = extraFacilities.map((item) => ({
    key: item.key,
    label: item.label,
    desc: item.desc,
    price: item.price,
    type: "extra",
  }));

  const allExtras = [...paidExtras, ...freeFacilities];

  // SEARCH PARAMS

  const checkIn = searchParams.get("checkIn") || "";

  const checkOut = searchParams.get("checkOut") || "";

  const roomId = searchParams.get("roomId");

  const adults = Number(searchParams.get("adults") || 1);

  const child = Number(searchParams.get("child") || 0);

  // FETCH ROOMS

  const { data, isLoading: roomsLoading, isError } = useFetchAllRoomsQuery();

  // FETCH BOOKINGS

  const { data: bookingData } = useFetchBookingsAllQuery();

  // ROOMS ARRAY

  const rooms = Array.isArray(data) ? data : data?.rooms || [];

  // BOOKINGS ARRAY

  const bookings = Array.isArray(bookingData)
    ? bookingData
    : bookingData?.bookings || [];

  // CREATE BOOKING

  const [createBooking, { isLoading: bookingLoading }] =
    useCreateBookingMutation();

  // PRICE PREVIEW

  const [calculatePricePreview] = useCalculatePricePreviewMutation();

  // FILTER AVAILABLE ROOMS

  const availableRooms = Array.isArray(rooms)
    ? rooms.filter((room) => {
        // ROOM STATUS CHECK
        const roomStatus = room?.status?.toLowerCase();

        // HIDE RESERVED & BOOKED ROOMS
        if (roomStatus === "reserved" || roomStatus === "booked") {
          return false;
        }

        // CAPACITY CHECK
        const roomAdults = room?.capacity?.adults || 0;

        const roomChild = room?.capacity?.child || 0;

        const capacityMatch = adults <= roomAdults && child <= roomChild;

        if (!capacityMatch) {
          return false;
        }

        // ROOM BOOKINGS
        const roomBookings = bookings.filter(
          (booking) =>
            booking?.room?._id === room?._id &&
            booking?.bookingStatus?.toLowerCase() !== "cancelled",
        );

        // DATE OVERLAP CHECK
        const isBooked = roomBookings.some((booking) => {
          const bookingCheckIn = new Date(booking?.stay?.checkIn);

          const bookingCheckOut = new Date(booking?.stay?.checkOut);

          const selectedCheckIn = new Date(checkIn);

          const selectedCheckOut = new Date(checkOut);

          return (
            selectedCheckIn < bookingCheckOut &&
            selectedCheckOut > bookingCheckIn
          );
        });

        // ONLY AVAILABLE ROOMS
        return !isBooked;
      })
    : [];

  // SORT ROOM NUMBERS

  availableRooms.sort((a, b) => Number(a.roomNumber) - Number(b.roomNumber));

  // DEFAULT ROOM

  const room =
    availableRooms.find((r) => String(r?._id) === String(roomId)) ||
    availableRooms?.[0];

  // SELECTED ROOM DATA

  const selectedRoomData = availableRooms.find(
    (room) => String(room?._id) === String(selectedRoom),
  );

  // EXTRA TOTAL

  const extrasTotal = allExtras.reduce(
    (total, service) =>
      extras.includes(service.key) ? total + service.price : total,
    0,
  );

  // AUTO SELECT FIRST ROOM

  useEffect(() => {
    if (room?._id && !selectedRoom) {
      setSelectedRoom(room._id);
    }
  }, [room?._id, selectedRoom]);

  // FETCH PRICE

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

        setPricing(result);
      } catch (error) {
        console.error("Pricing Error:", error);
      }
    };

    fetchPricing();
  }, [selectedRoom, checkIn, checkOut, extrasTotal, calculatePricePreview]);

  // TOGGLE EXTRA

  const toggleExtra = (key) => {
    setExtras((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  // SET FORM FIELD

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  // HANDLE BOOKING

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

      if (!selectedRoom) {
        alert("Please Select A Room!");
      }

      const selectedExtras = allExtras
        .filter((service) => extras.includes(service.key))
        .map((service) => ({
          name: service.label,
          price: service.price || 0,
        }));

      const bookingData = {
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

        specialRequests,

        payment: {
          method: paymentMethod,
        },
      };

      const response = await createBooking(bookingData).unwrap();

      if (isAdmin) {
        navigate(`/confirmation/${response.booking._id}`);
      } else {
        // CUSTOMER FLOW
        alert("Booking Confirmed Successfully!");
        navigate("/");
      }
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
    extraServices: allExtras,
  };
};

export default useBooking;
