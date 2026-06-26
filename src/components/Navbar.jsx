import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { assets } from "../assets/assets";
import { IoIosClose, IoIosMenu, IoIosArrowDown } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { getAdmin } from "../utils/auth";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const [showFacilitiesDropdown, setShowFacilitiesDropdown] = useState(false);

  const admin = getAdmin();

  const { currentUser, logout, uploadProfileImage } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const dropdownRef = useRef(null);

  // ACTIVE ROUTE
  const isActive = (href) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  // AUTH PAGES
  const authRoutes = ["/login", "/register", "/admin-login"];

  const isAuthPage = authRoutes.some((path) =>
    location.pathname.toLowerCase().startsWith(path),
  );

  // LOGOUT
  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // PROFILE IMAGE UPLOAD
  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const imageUrl = await uploadProfileImage(file);

      alert("Profile updated!");

      console.log("uploaded", imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  // NAVIGATION LINKS
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Facilities", href: "/facilities" },
    { name: "Rooms", href: "/rooms" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  // FACILITIES DROPDOWN LINKS
  const facilitiesLinks = [
    {
      name: "Restaurant",
      href: "/facilities/restaurant",
    },
    {
      name: "Gym",
      href: "/facilities/gym",
    },
    {
      name: "Laundry",
      href: "/facilities/laundry",
    },
    {
      name: "Pool",
      href: "/facilities/pool",
    },
  ];

  // NAV ITEM
  const NavItem = ({ link, isMobile = false }) => {
    const isFacilities = link.name === "Facilities";

    return (
      <li className="relative text-white text-center text-nowrap w-full">
        <div className="flex items-center justify-center gap-1">
          {/* MAIN LINK */}
          <Link
            to={link.href}
            className={`text-sm lg:text-base xl:text-lg transition duration-300 ${
              isActive(link.href)
                ? "underline text-accent"
                : "hover:underline hover:text-accent hover:font-bold"
            }`}
            onClick={() => {
              setShowFacilitiesDropdown(false);

              if (isMobile) {
                setOpen(false);
              }
            }}
          >
            {link.name}
          </Link>

          {/* FACILITIES DROPDOWN BUTTON */}
          {isFacilities && (
            <button
              type="button"
              onClick={() => setShowFacilitiesDropdown((prev) => !prev)}
              className="cursor-pointer"
            >
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  showFacilitiesDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* FACILITIES MENU */}
        {isFacilities && showFacilitiesDropdown && (
          <ul
            ref={dropdownRef}
            className={`${
              isMobile
                ? "bg-transparent mt-2"
                : "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-black/70 backdrop-blur-sm rounded-md shadow-lg"
            }`}
          >
            {facilitiesLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="block px-4 py-2 text-sm text-white hover:bg-accent/20 transition"
                  onClick={() => {
                    setShowFacilitiesDropdown(false);

                    if (isMobile) {
                      setOpen(false);
                    }
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav
      className={`absolute top-0 left-0 w-full z-50 transition-all duration-300 ${
        isAuthPage
          ? "bg-black/20 backdrop-blur-md"
          : location.pathname.startsWith("/userdashboard")
            ? "bg-gray-500"
            : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* NAVBAR CONTAINER */}
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <Link to="/" className="shrink-0">
            <img
              src={assets.logo}
              alt="logo"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
            />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navigation.map((link) => (
              <NavItem key={link.name} link={link} />
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {/* PROFILE */}
            {currentUser && (
              <div className="relative group">
                <label htmlFor="profileUpload" className="cursor-pointer">
                  <img
                    src={
                      currentUser?.photo ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt={currentUser?.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-accent"
                  />
                </label>

                {/* USERNAME TOOLTIP */}
                <div
                  className="
                    absolute
                    top-12
                    left-1/2
                    -translate-x-1/2
                    bg-black/90
                    text-white
                    text-xs
                    px-3
                    py-1
                    rounded-md
                    opacity-0
                    group-hover:opacity-100
                    transition
                    whitespace-nowrap
                    pointer-events-none
                  "
                >
                  {currentUser?.name}
                </div>

                <input
                  type="file"
                  id="profileUpload"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleProfileUpload}
                />
              </div>
            )}

            {/* USER / ADMIN BUTTON */}
            {currentUser && !admin ? (
              <Link
                to="/userdashboard"
                className="bg-white text-primary px-4 py-2 rounded-lg font-medium"
              >
                User Dashboard
              </Link>
            ) : (
              <Link
                to={admin ? "/dashboard" : "/admin-login"}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  admin
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-black hover:bg-gray-400"
                }`}
              >
                Admin Panel
              </Link>
            )}

            {/* LOGIN / LOGOUT */}
            {currentUser || admin ? (
              <button
                onClick={handleLogout}
                className="bg-accent text-black px-4 py-2 rounded-lg hover:bg-accent/80 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-accent text-black px-4 py-2 rounded-lg hover:bg-accent/80 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden hover:shadow-lg rounded-md shadow-md hover:bg-accent text-white text-3xl cursor-pointer sm:text-4xl"
          >
            {open ? <IoIosClose /> : <IoIosMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div
            className="
              absolute
              top-16
              sm:right-5
              w-[90vw]
              max-w-[320px]
              lg:hidden
              bg-black/85
              backdrop-blur-xl
              rounded-2xl
              p-5
              shadow-2xl
              border
              border-white/10
              z-50
            "
          >
            <ul className="flex flex-col items-center gap-6">
              {/* MOBILE NAV LINKS */}
              {navigation.map((link) => (
                <NavItem key={link.name} link={link} isMobile />
              ))}

              {/* MOBILE PROFILE */}
              {currentUser && (
                <div className="relative group">
                  <label htmlFor="profileUpload" className="cursor-pointer">
                    <img
                      src={
                        currentUser?.photo ||
                        "https://ui-avatars.com/api/?name=User"
                      }
                      alt={currentUser?.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-accent"
                    />
                  </label>

                  <div
                    className="
                      absolute
                      top-12
                      left-1/2
                      -translate-x-1/2
                      bg-black/90
                      text-white
                      text-xs
                      px-3
                      py-1
                      rounded-md
                      opacity-0
                      group-hover:opacity-100
                      transition
                      whitespace-nowrap
                      pointer-events-none
                    "
                  >
                    {currentUser?.name}
                  </div>

                  <input
                    type="file"
                    id="profileUpload"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={handleProfileUpload}
                  />
                </div>
              )}

              {/* USER / ADMIN BUTTON */}
              {currentUser && !admin ? (
                <Link
                  to="/userdashboard"
                  className="bg-white text-primary px-4 py-2 rounded-lg font-medium"
                >
                  User Dashboard
                </Link>
              ) : (
                <Link
                  to={admin ? "/dashboard" : "/admin-login"}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    admin
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 text-black hover:bg-gray-400"
                  }`}
                >
                  Admin Panel
                </Link>
              )}

              {/* LOGIN / LOGOUT */}
              <li className="w-full">
                {currentUser || admin ? (
                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      bg-accent
                      text-black
                      py-3
                      rounded-xl
                      font-medium
                      hover:bg-accent/80
                      transition
                    "
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="
                      block
                      w-full
                      text-center
                      bg-accent
                      text-black
                      py-3
                      rounded-xl
                      font-medium
                      hover:bg-accent/80
                      transition
                    "
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
