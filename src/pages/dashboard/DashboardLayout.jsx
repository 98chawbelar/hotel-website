import { Link, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

import {
  HiOutlineHome,
  HiOutlineMenuAlt2,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineLogout,
} from "react-icons/hi";

import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { FiSettings, FiChevronDown } from "react-icons/fi";
import { AiOutlineAppstoreAdd, AiOutlineProduct } from "react-icons/ai";
import { RiReservedLine } from "react-icons/ri";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <section className="flex min-h-screen bg-secondary text-primary overflow-hidden">
      {/* SIDEBAR */}
      <aside className="hidden sm:flex sm:flex-col w-24 bg-primary shadow-2xl">
        {/* LOGO */}
        <a
          href="/"
          className="flex items-center justify-center h-24 border-b border-white/10"
        >
          <img
            src={assets.logo}
            alt="logo"
            className="w-14 h-14 rounded-full object-cover border-2 border-accent"
          />
        </a>

        {/* NAVIGATION */}
        <div className="flex flex-col justify-between flex-1 py-6">
          <nav className="flex flex-col items-center gap-5">
            <Link
              to="/dashboard"
              className="group relative p-4 rounded-2xl bg-white/5 hover:bg-accent hover:text-primary transition-all duration-300"
            >
              <HiOutlineHome className="text-2xl text-secondary group-hover:text-primary" />
              <span className="absolute left-24 top-1/2 -translate-y-1/2 bg-primary text-secondary text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
                Dashboard
              </span>
            </Link>

            <Link
              to="/dashboard/add-new-room"
              className="group relative p-4 rounded-2xl bg-white/5 hover:bg-accent hover:text-primary transition-all duration-300"
            >
              <HiViewGridAdd className="text-2xl text-secondary group-hover:text-primary" />
              <span className="absolute left-24 top-1/2 -translate-y-1/2 bg-primary text-secondary text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
                Add New Room
              </span>
            </Link>

            <Link
              to="/dashboard/manage-booking"
              className="group relative p-4 rounded-2xl bg-white/5 hover:bg-accent hover:text-primary transition-all duration-300"
            >
              <RiReservedLine className="text-2xl text-secondary group-hover:text-primary" />
              <span className="absolute left-24 top-1/2 -translate-y-1/2 bg-primary text-secondary text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
                Manage Booking
              </span>
            </Link>
            <Link
              to="/dashboard/add-facilities"
              className="group relative p-4 rounded-2xl bg-white/5 hover:bg-accent hover:text-primary transition-all duration-300"
            >
              <AiOutlineAppstoreAdd className="text-2xl text-secondary group-hover:text-primary" />
              <span className="absolute left-24 top-1/2 -translate-y-1/2 bg-primary text-secondary text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
                Add Facilities
              </span>
            </Link>
            <Link
              to="/dashboard/add-extra-facilities"
              className="group relative  p-4 rounded-2xl bg-white/5 hover:bg-accent hover:text-primary transition-all duration-300"
            >
              <AiOutlineProduct className="text-2xl text-secondary group-hover:text-primary" />
              <span className="absolute left-24 top-1/2 -translate-y-1/2 bg-primary text-secondary text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
                Add Extra Facilities
              </span>
            </Link>
            <Link
              to="/dashboard/manage-rooms"
              className="group relative p-4 rounded-2xl bg-white/5 hover:bg-accent hover:text-primary transition-all duration-300"
            >
              <MdOutlineManageHistory className="text-2xl text-secondary group-hover:text-primary" />
              <span className="absolute left-24 top-1/2 -translate-y-1/2 bg-primary text-secondary text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
                Manage Rooms
              </span>
            </Link>
          </nav>

          {/* SETTINGS */}
          <div className="flex justify-center">
            <button className="p-4 rounded-2xl bg-white/5 hover:bg-accent transition-all duration-300 group">
              <FiSettings className="text-2xl text-secondary group-hover:text-primary" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-24 bg-white border-b border-gray-200 px-6 sm:px-10 flex items-center justify-between shadow-sm">
          {/* MOBILE MENU */}
          <button className="sm:hidden p-3 rounded-xl bg-secondary text-primary">
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>

          {/* SEARCH */}
          <div className="flex  xs:hidden items-center bg-secondary rounded-2xl px-4 py-3 w-full max-w-md">
            <HiOutlineSearch className="text-xl text-primary/50 mr-3" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full placeholder:text-primary/40"
            />
          </div>

          {/* USER SECTION */}
          <div className="flex items-center gap-5">
            {/* NOTIFICATION */}
            <button className="relative p-3 rounded-xl bg-secondary hover:bg-accent/20 transition">
              <HiOutlineBell className="text-2xl text-primary" />

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent animate-ping"></span>

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent"></span>
            </button>

            {/* USER */}
            <button className="flex items-center gap-3 hover:bg-secondary px-3 py-2 rounded-2xl transition">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="user"
                className="w-12 h-12 rounded-full object-cover border-2 border-accent"
              />

              <div className="hidden md:block text-left">
                <h3 className="font-semibold text-primary">Grace Simmons</h3>

                <p className="text-sm text-primary/60">Lecturer</p>
              </div>

              <FiChevronDown className="hidden md:block text-primary/50" />
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="p-3 rounded-xl bg-red-50 hover:bg-red-100 transition"
            >
              <HiOutlineLogout className="text-2xl text-red-500" />
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 sm:p-10 bg-secondary">
          {/* TOP SECTION */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            {/* TITLE */}
            <div>
              <h1 className="text-4xl font-bold text-primary">Dashboard</h1>

              <p className="text-primary/60 mt-2">Luxury Room Management</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard/manage-rooms"
                className="px-6 py-3 rounded-2xl border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium"
              >
                Manage Rooms
              </Link>

              <Link
                to="/dashboard/add-new-room"
                className="px-6 py-3 rounded-2xl bg-accent text-primary font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Add New Room
              </Link>
            </div>
          </div>

          {/* OUTLET */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
