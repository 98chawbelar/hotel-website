import { Link } from "react-router-dom";
import { assets, hotelMap } from "../assets/assets";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const socialLinks = [
  {
    title: "Facebook",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://facebook.com",
    text: "Scan to visit our Facebook page",
  },
  {
    title: "Instagram",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://instagram.com",
    text: "Scan to visit our Instagram page",
  },
];

const contactInfo = [
  {
    title: "📍 Location",
    value: "No.101, Kandaw Road, Mogok, Myanmar",
  },
  {
    title: "📞 Phone",
    value: "+95 9 123 456 789",
  },
  {
    title: "✉️ Email",
    value: "info@kandaw101hotel.com",
  },
];

const Contact = () => {
  return (
    <div className="bg-[#0B1B2B] text-white">
      {/* HERO */}
      <header
        className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.hero_2})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center">
            Contact Us
          </h1>
        </div>
      </header>

      {/* MAIN */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* TITLE */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-accent mb-3">
              Get In Touch
            </h2>

            <p className="text-sm sm:text-base text-secondary/70 max-w-2xl mx-auto">
              Experience luxury and comfort at Kandaw101Hotel. We are always
              ready to assist you.
            </p>
          </div>

          {/* QR + INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* FACEBOOK */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
                Facebook
              </h3>

              <img
                src={socialLinks[0].qr}
                className="w-40 h-40 sm:w-48 sm:h-48 mx-auto bg-white p-2 rounded-xl"
                alt="Facebook QR"
              />

              <p className="text-sm text-secondary/60 mt-4">
                {socialLinks[0].text}
              </p>
            </div>

            {/* CONTACT INFO CENTER */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-center text-center gap-6">
              {contactInfo.map((item, i) => (
                <div key={i}>
                  <h3 className="text-lg sm:text-xl font-semibold text-accent mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-secondary/70">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* INSTAGRAM */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-accent mb-4">
                Instagram
              </h3>

              <img
                src={socialLinks[1].qr}
                className="w-40 h-40 sm:w-48 sm:h-48 mx-auto bg-white p-2 rounded-xl"
                alt="Instagram QR"
              />

              <p className="text-sm text-secondary/60 mt-4">
                {socialLinks[1].text}
              </p>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="mt-14 text-center">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 text-white">
              Follow Us
            </h2>

            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent text-white hover:text-black transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent text-white hover:text-black transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* MAP */}
          <div className="mt-14">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-3xl font-bold">Find Us</h2>

              <p className="text-sm sm:text-base text-secondary/70">
                Visit our hotel location
              </p>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <iframe
                  src={hotelMap}
                  className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            {/* CONTACT FORM (AFTER MAP) */}
            <div className="mt-5 flex justify-center px-4">
              <div className="w-full  sm:max-w-90 md:max-w-125 bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-md">
                <h2 className="text-center text-2xl sm:text-3xl font-bold  mb-6">
                  Send a Message
                </h2>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* LEFT SIDE */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50 outline-none focus:border-accent"
                    />

                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50 outline-none focus:border-accent"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50 outline-none focus:border-accent"
                    />
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center flex-col gap-2">
                    <textarea
                      rows="3"
                      placeholder="Your Message..."
                      className="w-50  flex-1 p-4 rounded-md bg-white/10 border-0   placeholder-white/50 outline-none focus:none resize-1"
                    />

                    <button
                      type="submit"
                      className="w-40 h-11 rounded-md bg-accent/80 text-black font-semibold hover:bg-accent transition"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
