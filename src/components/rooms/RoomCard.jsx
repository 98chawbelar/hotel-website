import { Link } from "react-router-dom";
import { FaBed, FaUserFriends } from "react-icons/fa";

const RoomCard = ({ room }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-primary/10 p-5 rounded-2xl">
      {/* Image */}
      <div className="lg:w-1/2">
        <img
          src={room?.image}
          alt={room?.title}
          className="w-full h-70 object-cover rounded-md"
        />
      </div>

      {/* Details */}
      <div className="lg:w-1/2 py-4">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
          {/* Left */}
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-primary mb-4">
              {room?.title}
            </h3>

            <p className="text-gray-600 mb-5 leading-7">{room?.description}</p>

            {/* Info */}
            <div className="flex flex-wrap gap-5 mb-6">
              <div className="flex items-center gap-2 text-primary">
                <FaUserFriends className="text-accent" />
                <span>{room?.guests} Guests</span>
              </div>

              <div className="flex items-center gap-2 text-primary">
                <FaBed className="text-accent" />
                <span>{room?.bed}</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <span className="bg-accent/20 text-primary px-4 py-2 rounded-lg text-sm font-medium">
                📍 {room?.location}
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="bg-primary text-white rounded-2xl px-6 py-8 flex flex-col justify-center items-center min-w-[180px]">
            <p className="text-sm text-white/70 mb-2">Starting From</p>

            <h2 className="text-2xl font-bold">
              {Number(room?.price || 0).toLocaleString()} MMK
            </h2>

            <span className="text-sm text-white/70 mb-6">/ Night</span>

            <Link to={`/rooms/${room?._id}`}>
              <button className="bg-accent hover:opacity-90 px-5 py-3 rounded-xl transition duration-300">
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
