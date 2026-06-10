import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { assets } from "../assets/assets";
import { IoIosClose, IoIosMenu, IoIosArrowDown } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { getAdmin } from "../utils/auth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const admin = getAdmin();

  const [showFacilitiesDropdown, setShowFacilitiesDropdown] = useState(false);

  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const { currentUser, logout, uploadProfileImage } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const dropdownRef = useRef(null);

  // ACTIVE ROUTE
  const isActive = (href) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  // HIDE NAVBAR ON AUTH PAGES
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

  //Profile Image Upload
  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const imageUrl = await uploadProfileImage(file);
      alert("Profile updated!");
      console.log("upladed", imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  // NAVIGATION
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Facilities", href: "/facilities" },
    { name: "Rooms", href: "/rooms" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  // FACILITIES LINKS
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
            className={`text-sm lg:text-base xl:text-lg  transition duration-300 ${
              isActive(link.href)
                ? "underline text-accent"
                : "hover:underline hover:text-accent hover:font-bold"
            }`}
            onClick={() => {
              setShowFacilitiesDropdown(false);
              setShowAdminDropdown(false);

              if (isMobile) {
                setOpen(false);
              }
            }}
          >
            {link.name}
          </Link>

          {/* FACILITIES DROPDOWN */}
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
        isAuthPage ? "bg-black/20 backdrop-blur-md" : "bg-transparent"
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

          {/* DESKTOP RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {/* PROFILE */}
            {currentUser && (
              <div>
                <label htmlFor="profileUpload" className="cursor-pointer">
                  <img
                    src={
                      currentUser?.photo ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-accent"
                  />
                </label>

                <input
                  type="file"
                  id="profileUpload"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleProfileUpload}
                />
              </div>
            )}

            {/* ADMIN BUTTON */}
            {admin && (
              <Link
                to="/dashboard"
                className="bg-white text-primary px-4 py-2 rounded-lg font-medium"
              >
                Admin Dashboard
              </Link>
            )}

            {/* LOGIN / LOGOUT BUTTON */}
            {currentUser ? (
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
            className="lg:hidden text-white text-3xl sm:text-4xl"
          >
            {open ? <IoIosClose /> : <IoIosMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div
            className="
            absolute
            top-24
            right-4
            sm:right-6
            w-[260px]
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
              {navigation.map((link) => (
                <NavItem key={link.name} link={link} isMobile />
              ))}

              {/* PROFILE */}
              {currentUser && (
                <div>
                  <label htmlFor="profileUpload" className="cursor-pointer">
                    <img
                      src={
                        currentUser?.photo ||
                        "https://ui-avatars.com/api/?name=User"
                      }
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-accent"
                    />
                  </label>

                  <input
                    type="file"
                    id="profileUpload"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={handleProfileUpload}
                  />
                </div>
              )}

              {/* ADMIN */}
              {admin && (
                <Link
                  to="/dashboard"
                  className="bg-white text-primary px-4 py-2 rounded-lg font-medium"
                >
                  Admin Dashboard
                </Link>
              )}

              {/* LOGIN / LOGOUT */}
              <li className="w-full">
                {currentUser ? (
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
                    transition"
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
                    transition"
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
