import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../../assets/assets";
import getBaseUrl from "../../../utils/baseURL";
import {
  HiOutlineHome,
  HiOutlineMenuAlt2,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineX,
} from "react-icons/hi";
import { useState, useEffect } from "react";

import { MdOutlineManageHistory, MdHotel } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { AiOutlineAppstoreAdd, AiOutlineProduct } from "react-icons/ai";
import { TbCalendarPlus } from "react-icons/tb";
import { clearAdmin, getAdmin, setAdmin } from "../../../utils/auth";
import { getProfile } from "../../../api/admin.api";
import PageHeader from "../components/PageHeader";

const DashboardLayout = () => {
  const [admin, setAdminState] = useState(getAdmin());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      subtitle: "Luxury Room Management",
      icon: HiOutlineHome,
    },
    {
      to: "/dashboard/add-new-room",
      label: "Add New Room",
      subtitle: "Create and publish a new room listing",
      icon: MdHotel,
    },
    {
      to: "/dashboard/manage-booking",
      label: "Manage Bookings",
      subtitle: "View and manage guest reservations",
      icon: TbCalendarPlus,
    },
    {
      to: "/dashboard/add-facilities",
      label: "Facilities",
      subtitle: "Manage hotel facilities and amenities",
      icon: AiOutlineProduct,
    },
    {
      to: "/dashboard/add-extra-facilities",
      label: "Extra Facilities",
      subtitle: "Manage additional services and extras",
      icon: AiOutlineAppstoreAdd,
    },
    {
      to: "/dashboard/manage-room/:id",
      label: "Manage Room",
      subtitle: "Update room details and availability",
      icon: MdOutlineManageHistory,
    },
  ];

  const currentPage =
    sidebarLinks.find((link) => {
      if (link.to.includes(":id")) {
        return location.pathname.startsWith("/dashboard/manage-room/");
      }
      return link.to === location.pathname;
    }) || sidebarLinks[0];

  const isDashboardHome = location.pathname === "/dashboard";

  const handleLogout = () => {
    clearAdmin();
    setAdminState(null);
    navigate("/admin-login", { replace: true });
  };
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getProfile();

        setAdmin(res.data);
        setAdminState(res.data);
      } catch (err) {
        handleLogout();
      }
    };

    load();
  }, []);

  return (
    <section className="flex min-h-screen bg-secondary text-primary overflow-hidden">
      {/* SIDEBAR */}
      <aside className="hidden sm:flex w-35 sm:flex-col bg-primary shadow-2xl">
        {/* LOGO */}
        <a
          href="/"
          className="flex items-center justify-center h-24 border-b border-white/10"
        >
          <img
            src={assets.logo}
            alt="logo"
            className="w-14 h-14 rounded-full object-cover hover:border-accent/80 border-2 border-accent"
          />
        </a>

        {/* NAVIGATION */}
        <div className="flex flex-col justify-between flex-1 py-6">
          <nav className="flex flex-col items-center gap-5">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;

              const isActive = item.to.includes(":id")
                ? location.pathname.startsWith("/dashboard/manage-room/")
                : location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group relative p-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-primary"
                      : "bg-white/5 hover:bg-accent"
                  }`}
                >
                  <Icon
                    className={`text-3xl ${
                      isActive
                        ? "text-primary"
                        : "text-secondary group-hover:text-primary"
                    }`}
                  />

                  {/* Tooltip */}
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-white text-primary px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium">
                      {item.label}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* SETTINGS */}
          <div className="flex justify-center">
            <button className=" rounded-2xl p-4 bg-white/5 hover:bg-accent/80 transition-all duration-300 group">
              <FiSettings className="text-3xl  text-secondary " />
            </button>
          </div>
        </div>
      </aside>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <aside className="absolute border-0 left-0 top-0 h-full w-50 bg-primary  shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b gap-4 border-white/10">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src={assets.logo}
                  alt="logo"
                  className="w-10 h-10 rounded-full border-2 border-accent hover:border-accent/80"
                />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl cursor-pointer bg-secondary/10 hover:bg-accent/80 text-secondary  shadow-2xl transition"
              >
                <HiOutlineX className="text-4xl" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col p-4 gap-3">
              {sidebarLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-xl text-secondary hover:bg-accent hover:text-primary transition"
                  >
                    <Icon className="text-2xl shrink-0" />

                    <div>
                      <p className="font-medium">{item.label}</p>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-24 bg-white border-b border-gray-200 px-6 sm:px-10 flex items-center justify-between shadow-sm">
          {/* MOBILE MENU */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="sm:hidden p-3 rounded-xl cursor-pointer bg-black/10 hover:bg-accent/80 text-primary"
          >
            <HiOutlineMenuAlt2 className="text-2xl " />
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
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-3 hover:bg-secondary px-3 py-2 rounded-2xl transition"
            >
              <img
                src={
                  admin?.avatar
                    ? `${getBaseUrl()}${admin.avatar}`
                    : "https://ui-avatars.com/api/?name=Admin"
                }
                alt="admin"
                className="w-12 h-12 rounded-full object-cover border-2 border-accent"
              />

              <p className="text-sm text-primary/60">{admin?.role}</p>
            </Link>

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
            <PageHeader
              title={currentPage.label}
              subtitle={currentPage.subtitle}
            />

            {/* ACTION BUTTONS */}
            {isDashboardHome && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard/manage-room"
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
            )}
          </div>

          {/* OUTLET */}
          <div className="bg-secondary/20 rounded-2xl p-6 shadow-base border-0 ">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
