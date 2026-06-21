import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Pie } from "react-chartjs-2";

import { useGetRevenueAnalyticsQuery } from "../../../redux/features/revenue/revenueApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
);

const RevenueChart = () => {
  const { data, isLoading } = useGetRevenueAnalyticsQuery();
  console.log("Revenue Analytics", data);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="h-[400px] rounded-3xl border border-gray-700 flex items-center justify-center">
          Loading monthly revenue...
        </div>

        <div className="h-[400px] rounded-3xl border border-gray-700 flex items-center justify-center">
          Loading weekly revenue...
        </div>
      </div>
    );
  }

  const monthlyRevenue = data?.monthlyRevenue || [];
  const weeklyRevenue = data?.weeklyRevenue || [];

  // Monthly Revenue Dataset
  const monthlyValues = Array(12).fill(0);

  monthlyRevenue.forEach((item) => {
    const monthIndex = item?._id?.month - 1;

    if (monthIndex >= 0 && monthIndex < 12) {
      monthlyValues[monthIndex] = item.total;
    }
  });

  const monthlyChartData = {
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
        label: "Monthly Revenue",

        data: monthlyValues,

        borderColor: "#3B82F6",

        backgroundColor: "rgba(59,130,246,0.15)",

        fill: true,

        tension: 0.4,

        pointRadius: 5,

        pointHoverRadius: 8,
      },
    ],
  };

  // Weekly Revenue Dataset
  const weeklyChartData = {
    labels: weeklyRevenue.map((item) => item.day),

    datasets: [
      {
        data: weeklyRevenue.map((item) => item.total),

        backgroundColor: [
          "#3B82F6",
          "#06B6D4",
          "#10B981",
          "#84CC16",
          "#F59E0B",
          "#F97316",
          "#EF4444",
        ],

        borderWidth: 0,
      },
    ],
  };

  const lineOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Monthly Revenue */}
      <div className="rounded-3xl border border-gray-700 p-5">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Monthly Revenue</h2>

          <p className="text-sm text-gray-400">
            Revenue trend throughout the year
          </p>
        </div>

        {!monthlyRevenue.length ? (
          <div className="h-[350px] flex items-center justify-center text-gray-500 border border-dashed rounded-2xl">
            No monthly revenue available
          </div>
        ) : (
          <div className="h-[350px]">
            <Line data={monthlyChartData} options={lineOptions} />
          </div>
        )}
      </div>

      {/* Weekly Revenue */}
      <div className="rounded-3xl border border-gray-700 p-5">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Weekly Revenue</h2>

          <p className="text-sm text-gray-400">
            Revenue distribution for current week
          </p>
        </div>

        {!weeklyRevenue.length ||
        weeklyRevenue.every((item) => item.total === 0) ? (
          <div className="h-[350px] flex items-center justify-center text-gray-500 border border-dashed rounded-2xl">
            No weekly revenue available
          </div>
        ) : (
          <div className="h-[350px]">
            <Pie data={weeklyChartData} options={pieOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
