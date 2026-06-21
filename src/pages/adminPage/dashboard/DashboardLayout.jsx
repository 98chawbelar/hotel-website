import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../../assets/assets";
import getBaseUrl from "../../../utils/baseURL";
import {
  HiOutlineHome,
  HiOutlineMenuAlt2,
  HiOutlineLogout,
  HiOutlineX,
} from "react-icons/hi";
import { FiSettings, FiUser, FiEdit } from "react-icons/fi";
import { useState, useEffect } from "react";

import { MdOutlineManageHistory, MdHotel } from "react-icons/md";

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
  const [profileOpen, setProfileOpen] = useState(false);

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
      to: "/dashboard/manage-room/:id",
      label: "Manage Room",
      subtitle: "Update room details and availability",
      icon: MdOutlineManageHistory,
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
  ];

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
    <section className="min-h-screen bg-secondary flex">
      <aside
        className="
      hidden
      md:flex
      flex-col
      w-72
      
      xl:w-60
      bg-primary
      border-r
      border-white/10
      shadow-xl
      "
      >
        {/* LOGO */}
        <div className="h-24 px-6 border-b border-white/10 flex items-center">
          <Link to="/" className="flex items-center gap-4">
            <img
              src={assets.logo}
              alt="logo"
              className="
            w-12
            h-12
            rounded-full
            object-cover
            border-2
            border-accent
          "
            />

            <div>
              <h2 className="text-white font-semibold text-xl">Kandaw101</h2>

              <p className="text-gray-400 text-xs">Hotel Admin Dashboard</p>
            </div>
          </Link>
        </div>

        {/* MENU */}
        <nav className="flex-1 overflow-y-auto p-4 mt-5 lg:mt-10">
          <div className="flex flex-col gap-6">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;

              const active = item.to.includes(":id")
                ? location.pathname.startsWith("/dashboard/manage-room/")
                : location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`
                flex
                items-center
                gap-2
                px-5
                py-5
                rounded-2xl
                transition-all
                duration-300
                ${
                  active
                    ? "bg-accent text-primary shadow-lg"
                    : "text-white hover:bg-white/10"
                }
              `}
                >
                  <Icon className="text-2xl shrink-0" />

                  <span className="font-medium text-base truncate">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* SETTINGS */}
        <div className="p-6 border-t border-white/10">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Avatar */}
            <img
              src={
                admin?.avatar
                  ? `${getBaseUrl()}${admin.avatar}`
                  : "https://ui-avatars.com/api/?name=Admin"
              }
              alt="admin"
              className="
        w-20
        h-20
        rounded-full
        object-cover
        border-4
        border-accent
        shadow-lg
      "
            />

            {/* Name */}
            <h3 className="mt-4 text-white font-semibold text-base truncate max-w-full">
              {admin?.username || "Administrator"}
            </h3>

            {/* Role */}
            <p className="text-sm text-gray-400 mt-1">
              {admin?.role || "Admin"}
            </p>

            {/* Settings Button */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="
        mt-5
        w-full
        flex
        items-center
        justify-center
        gap-2
        px-4
        py-3
        rounded-2xl
        bg-white/5
        hover:bg-white/10
        text-white
        transition-all
        duration-300
      "
            >
              <FiSettings className="text-lg" />
              <span>Settings</span>
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div
                className="
          mt-4
          w-full
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-2xl
        "
              >
                <Link
                  to="/dashboard/profile"
                  className="
            flex
            items-center
            gap-3
            px-5
            py-4
            hover:bg-gray-100
            transition
          "
                >
                  <FiUser />
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="
            w-full
            flex
            items-center
            gap-3
            px-5
            py-4
            text-red-500
            hover:bg-red-50
            transition
          "
                >
                  <HiOutlineLogout />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* SIDEBAR */}
          <aside
            className="
          absolute
          left-0
          top-0
          h-full
          w-[85vw]
          max-w-95
          bg-primary
          shadow-2xl
          flex
          flex-col
        "
          >
            {/* HEADER */}
            <div className="h-24 px-5 border-b border-white/10 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-4"
              >
                <img
                  src={assets.logo}
                  alt="logo"
                  className="
                w-12
                h-12
                rounded-full
                border-2
                border-accent
              "
                />

                <div>
                  <h2 className="text-white font-bold">Kandaw101</h2>

                  <p className="text-white/60 text-xs">Hotel Admin Dashboard</p>
                </div>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="
              p-2
              rounded-xl
              bg-white/10
              text-white
            "
              >
                <HiOutlineX className="text-2xl" />
              </button>
            </div>

            {/* MENU */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-2">
                {sidebarLinks.map((item) => {
                  const Icon = item.icon;

                  const active = item.to.includes(":id")
                    ? location.pathname.startsWith("/dashboard/manage-room/")
                    : location.pathname === item.to;

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-2xl
                    transition-all
                    duration-300
                    ${
                      active
                        ? "bg-accent text-primary"
                        : "text-white hover:bg-white/10"
                    }
                  `}
                    >
                      <Icon className="text-2xl shrink-0" />

                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* SETTINGS */}
            <div className="p-3 border-t border-white/10">
              <div className="flex flex-col items-center justify-center text-center">
                {/* Avatar */}
                <img
                  src={
                    admin?.avatar
                      ? `${getBaseUrl()}${admin.avatar}`
                      : "https://ui-avatars.com/api/?name=Admin"
                  }
                  alt="admin"
                  className="
        w-10
        h-10
        rounded-full
        object-cover
        border-2
        border-accent
        shadow-lg
      "
                />

                {/* Name */}
                <h3 className="mt-4 text-white font-semibold text-xs truncate max-w-full">
                  {admin?.username || "Administrator"}
                </h3>

                {/* Role */}
                <p className="text-sm text-gray-400 mt-1">
                  {admin?.role || "Admin"}
                </p>

                {/* Settings Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="
        mt-5
        w-full
        flex
        items-center
        justify-center
        gap-2
        px-4
        py-3
        rounded-2xl
        bg-white/5
        hover:bg-white/10
        text-white
        transition-all
        duration-300
      "
                >
                  <FiSettings className="text-lg" />
                  <span>Settings</span>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div
                    className="
          mt-4
          w-full
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-2xl
        "
                  >
                    <Link
                      to="/dashboard/profile"
                      className="
            flex
            items-center
            gap-3
            px-5
            py-4
            hover:bg-gray-100
            transition
          "
                    >
                      <FiUser />
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="
            w-full
            flex
            items-center
            gap-3
            px-5
            py-4
            text-red-500
            hover:bg-red-50
            transition
          "
                    >
                      <HiOutlineLogout />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col">
        <header
          className="
        h-16
        sm:h-20
        lg:h-24
        bg-white
        border-b
        border-gray-200
        px-4
        sm:px-6
        lg:px-8
        flex
        items-center
        justify-between
      "
        >
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="
          md:hidden
          p-3
          rounded-xl
          bg-secondary
        "
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
        </header>
        <main
          className="
        flex-1
        p-2
        sm:p-4
        lg:p-6
        xl:p-8
        overflow-x-hidden
      "
        >
          <PageHeader />

          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
