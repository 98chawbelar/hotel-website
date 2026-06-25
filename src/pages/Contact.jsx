import { Link } from "react-router-dom";
import { assets, hotelMap } from "../assets/assets";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const socialLinks = [
  {
    title: "Facebook",
    icon: <FaFacebookF />,
    url: "https://facebook.com",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://facebook.com",
    text: "Scan to visit our Facebook page",
  },
  {
    title: "Instagram",
    icon: <FaInstagram />,
    url: "https://instagram.com",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://instagram.com",
    text: "Scan to visit our Instagram page",
  },
];

const contactInfo = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Hotel Address",
    value: "No.101, Kandaw Road, Mogok, Myanmar",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Reservation",
    value: "+95 9 123 456 789",
  },
  {
    icon: <FaEnvelope />,
    title: "Email Address",
    value: "reservation@kandaw101hotel.com",
  },
  {
    icon: <FaClock />,
    title: "Reception",
    value: "24 Hours Service",
  },
  {
    icon: <FaClock />,
    title: "Check-In / Check-Out",
    value: "Check-In: 2 PM | Check-Out: 12 PM",
  },
];

const supportCards = [
  {
    title: "Room Reservations",
    desc: "Need help booking the perfect room for your stay?",
  },
  {
    title: "Event & Group Booking",
    desc: "Contact us for family trips and business gatherings.",
  },
  {
    title: "24/7 Customer Support",
    desc: "Our team is always ready to assist you anytime.",
  },
];

const faqs = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "Check-in starts from 2:00 PM and check-out is before 12:00 PM. Early check-in and late check-out may be available upon request.",
  },
  {
    question: "Do you offer free WiFi?",
    answer:
      "Yes, complimentary high-speed WiFi is available in all rooms and public areas of the hotel.",
  },
  {
    question: "Is breakfast included with the room?",
    answer:
      "Breakfast is included with selected room packages. Please check your booking details for confirmation.",
  },
  {
    question: "Do you provide bus pickup service?",
    answer:
      "Yes, bus pickup and drop-off services are available upon request with additional charges.",
  },
  {
    question: "Is parking available at the hotel?",
    answer:
      "Yes, we provide free and secure parking facilities for all hotel guests.",
  },
  {
    question: "Are pets allowed in the hotel?",
    answer:
      "Unfortunately, pets are not allowed in the hotel to ensure comfort for all guests.",
  },
  {
    question: "Do you have family rooms available?",
    answer:
      "Yes, we offer spacious family rooms and suites suitable for families and group travelers.",
  },
  {
    question: "Can I cancel or modify my reservation?",
    answer:
      "Yes, reservations can be modified or canceled based on the booking policy and cancellation terms.",
  },
  {
    question: "Is the reception available 24 hours?",
    answer:
      "Yes, our front desk and customer support team are available 24/7 to assist our guests.",
  },
  {
    question: "Do you provide room service?",
    answer:
      "Yes, room service is available daily for food, beverages, and guest assistance.",
  },
  {
    question: "Are extra beds available?",
    answer:
      "Extra beds can be arranged depending on room type and availability. Additional charges may apply.",
  },
  {
    question: "Do you have meeting or event facilities?",
    answer:
      "Yes, we provide spaces for meetings, business events, and private gatherings upon reservation.",
  },
  {
    question: "How far is the hotel from the city center?",
    answer:
      "The hotel is conveniently located near major attractions and only a short drive from the city center.",
  },
  {
    question: "Is smoking allowed inside the rooms?",
    answer:
      "Smoking is not allowed inside the rooms. Designated smoking areas are available within the hotel premises.",
  },
  {
    question: "Do you offer laundry services?",
    answer:
      "Yes, laundry and ironing services are available for guests with additional charges.",
  },
];

const Contact = () => {
  return (
    <div className="bg-[#0B1B2B] text-white overflow-hidden">
      {/* HERO */}
      <header
        className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.hero_2})` }}
      >
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4">
            Contact Us
          </h1>

          <p className="max-w-2xl text-sm sm:text-lg text-gray-300 leading-8">
            Whether you're planning a relaxing getaway, a family vacation, or a
            business stay, our team is here to help you every step of the way.
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* SECTION TITLE */}
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-bold text-accent mb-4">
              Get In Touch
            </h2>

            <p className="max-w-3xl mx-auto text-gray-300 leading-8 text-sm sm:text-lg">
              Experience luxury, comfort, and warm hospitality at
              Kandaw101Hotel. We are always happy to answer your questions and
              assist with your reservation.
            </p>
          </div>

          {/* CONTACT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SOCIAL CARDS */}
            {socialLinks.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white/[0.04]
                  backdrop-blur-xl
                  border border-white/10
                  rounded-3xl
                  p-6
                  text-center
                  hover:-translate-y-2
                  hover:border-accent/40
                  transition-all duration-300
                "
              >
                <div className="flex justify-center mb-4 text-3xl text-accent">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-5">{item.title}</h3>

                <img
                  src={item.qr}
                  alt={item.title}
                  className="w-44 h-44 sm:w-52 sm:h-52 mx-auto bg-white p-3 rounded-2xl"
                />

                <p className="text-gray-300 text-sm mt-5">{item.text}</p>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-block
                    mt-6
                    px-6
                    py-3
                    rounded-xl
                    bg-accent
                    text-black
                    font-semibold
                    hover:bg-accent/80
                    transition
                  "
                >
                  Visit {item.title}
                </a>
              </div>
            ))}

            {/* CONTACT INFO */}
            <div
              className="
                bg-white/[0.04]
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-8
                flex flex-col
                justify-center
                gap-7
                hover:-translate-y-2
                hover:border-accent/40
                transition-all duration-300
              "
            >
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-accent text-xl mt-1">{item.icon}</div>

                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>

                    <p className="text-gray-300 text-sm sm:text-base">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WHY CONTACT US */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {supportCards.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white/[0.04]
                  backdrop-blur-xl
                  border border-white/10
                  rounded-2xl
                  p-6
                  text-center
                  hover:-translate-y-2
                  hover:border-accent/40
                  transition-all duration-300
                "
              >
                <h3 className="text-xl font-semibold text-accent mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-300 text-sm leading-7">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* SOCIAL ICONS */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6">Follow Us</h2>

            <div className="flex justify-center gap-5">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    w-14 h-14
                    rounded-full
                    flex items-center justify-center
                    bg-white/10
                    hover:bg-accent
                    hover:text-black
                    text-white
                    text-xl
                    transition-all duration-300
                  "
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* MAP */}
          <div className="mt-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">Find Us</h2>

              <p className="text-gray-300">Visit our hotel location anytime</p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                src={hotelMap}
                className="w-full h-[300px] sm:h-[450px] lg:h-[550px]"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="mt-20 flex justify-center">
            <div
              className="
                w-full
                max-w-5xl
                bg-white/[0.04]
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-6 sm:p-10
                shadow-2xl
              "
            >
              <h2 className="text-center text-3xl sm:text-4xl font-bold mb-10">
                Send Us a Message
              </h2>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LEFT SIDE */}
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Your Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="
                        w-full
                        h-12
                        px-4
                        rounded-xl
                        bg-white/10
                        border border-white/10
                        text-white
                        placeholder-white/50
                        outline-none
                        focus:border-accent
                      "
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Your Email
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="
                        w-full
                        h-12
                        px-4
                        rounded-xl
                        bg-white/10
                        border border-white/10
                        text-white
                        placeholder-white/50
                        outline-none
                        focus:border-accent
                      "
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="
                        w-full
                        h-12
                        px-4
                        rounded-xl
                        bg-white/10
                        border border-white/10
                        text-white
                        placeholder-white/50
                        outline-none
                        focus:border-accent
                      "
                    />
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col">
                  <label className="block mb-2 text-sm text-gray-300">
                    Your Message
                  </label>

                  <textarea
                    rows="10"
                    placeholder="Write your message here..."
                    className="
                      w-full
                      flex-1
                      p-4
                      rounded-xl
                      bg-white/10
                      border border-white/10
                      text-white
                      placeholder-white/50
                      outline-none
                      focus:border-accent
                      resize-none
                    "
                  />

                  <button
                    type="submit"
                    className="
                      mt-6
                      h-12
                      rounded-xl
                      bg-accent
                      text-black
                      font-semibold
                      hover:bg-accent/80
                      transition
                    "
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="mt-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>

            <div className="max-w-4xl mx-auto space-y-5">
              {faqs.map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white/[0.04]
                    border border-white/10
                    rounded-2xl
                    p-6
                    hover:border-accent/40
                    transition-all duration-300
                  "
                >
                  <h3 className="text-lg font-semibold text-accent mb-3">
                    {item.question}
                  </h3>

                  <p className="text-gray-300 leading-7">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
