import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useFetchBookingsAllQuery } from "../../../redux/features/booking/bookingApi";
import { useMemo } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const RevenueChart = () => {
  const { data: bookings = [], isLoading } = useFetchBookingsAllQuery();

  const revenueData = useMemo(() => {
    const months = Array(12).fill(0);
    bookings.forEach((booking) => {
      if (booking.bookingStatus === "cancelled") return;

      const month = new Date(booking.createdAt).getMonth();

      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);

      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const roomPrice = booking.room?.price || booking.room?.pricePerNight || 0;
      months[month] += roomPrice * nights;
    });
    return months;
  }, [bookings]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue (MMK)",
        data: revenueData,
        backgroundColor: "rgba(34,197,94,0.7)",
        borderColor: "rgba(34,197,94,1)",
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return <div className="bg-white p-6 rounded-xl">Loading Revenue...</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
        Monthly Revenue
      </h2>
      <div className="hidden md:block">
        <Bar data={data} className="" />
      </div>
    </div>
  );
};

export default RevenueChart;
