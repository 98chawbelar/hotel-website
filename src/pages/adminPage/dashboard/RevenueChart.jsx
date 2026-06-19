import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { FaChartLine } from "react-icons/fa";

import { useGetRevenueAnalyticsQuery } from "../../../redux/features/revenue/revenueApi";

// REGISTER
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RevenueChart = () => {
  const { data, isLoading } = useGetRevenueAnalyticsQuery();

  const revenueData = data?.monthlyRevenue || [];

  const chartData = {
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

        backgroundColor: "rgba(255,255,255,0.18)",

        hoverBackgroundColor: "rgba(255,255,255,0.35)",

        borderRadius: 18,

        borderSkipped: false,

        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#111827",

        padding: 14,

        titleColor: "#fff",

        bodyColor: "#fff",

        borderColor: "rgba(255,255,255,0.08)",

        borderWidth: 1,

        displayColors: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: "rgba(255,255,255,0.65)",
        },

        grid: {
          display: false,
        },

        border: {
          display: false,
        },
      },

      y: {
        ticks: {
          color: "rgba(255,255,255,0.45)",
        },

        grid: {
          color: "rgba(255,255,255,0.06)",
        },

        border: {
          display: false,
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="h-[450px] flex items-center justify-center text-secondary">
        Loading Revenue...
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* CHART */}

      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
