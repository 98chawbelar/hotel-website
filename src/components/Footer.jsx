import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="w-screen flex justify-center ">
        <div className="w-full h-px bg-linear-to-r from-transparent via-primary/60 to-transparent shadow-xs"></div>
      </div>
      <footer className="bg-secondary text-white mt-10 px-4 sm:px-6 lg:px-8 py-10">
        {/* MAIN CONTAINER */}
        <div
          className="
      max-w-7xl
      mx-auto
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-2
      lg:grid-cols-4
      gap-10
      lg:gap-8
      place-items-center
      lg:place-items-start
      text-center
      lg:text-left
    "
        >
          {/* LOGO + ADDRESS */}
          <div className="flex flex-col items-center lg:items-start w-full max-w-62.5">
            <Link to="/">
              <img
                src={assets.logo}
                alt="logo"
                className="w-16 h-16 rounded-full object-cover"
              />
            </Link>

            <h2 className="text-xl font-semibold mt-4 text-primary">
              Kandaw 101 Hotel
            </h2>

            <p className="text-gray-400 text-sm mt-3 leading-6">
              123 Hotel Street
              <br />
              Mogok, Myanmar
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col items-center lg:items-start w-full max-w-62.5">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Quick Links
            </h2>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link to="/about" className="hover:text-accent transition">
                About Us
              </Link>

              <Link to="/contact" className="hover:text-accent transition">
                Contact
              </Link>

              <Link to="/terms" className="hover:text-accent transition">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex flex-col items-center lg:items-start w-full max-w-62.5">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Follow Us
            </h2>

            <div className="flex flex-col gap-4 text-gray-400">
              <Link
                to="/facebook"
                className="flex items-center gap-2 hover:text-[#1877F2] transition"
              >
                <FaFacebookF />
                Facebook
              </Link>

              <Link
                to="/github"
                className="flex items-center gap-2 hover:text-gray-600 transition"
              >
                <FaGithub />
                Github
              </Link>

              <Link
                to="/instagram"
                className="flex items-center gap-2 hover:text-pink-500 transition"
              >
                <FaInstagram />
                Instagram
              </Link>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="flex flex-col items-center lg:items-start w-fit max-w-50">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Newsletter
            </h2>

            <p className="text-gray-400 text-sm mb-4 leading-6">
              Subscribe to receive hotel updates, promotions and special offers.
            </p>

            <div className="w-full flex flex-col sm:flex-row items-stretch gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className=" text-center
              w-full
              sm:flex-1
              min-w-0
              rounded-xl
            bg-white/10
              border
            border-white/10
              outline-none
            text-black
            placeholder:text-gray-400
            focus:none
              transition"
              />
              <button
                className="
              sm:w-25
             bg-accent
            hover:bg-accent/80
              transition
              rounded-xl
              px-1.5
              py-1.5
            text-black
              font-semibold
              whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-10 pt-6 border-0">
          <div className="w-full h-[1.5px] bg-linear-to-r from-transparent via-primary/60 to-transparent shadow-xs"></div>
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Kandaw 101 Hotel. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
