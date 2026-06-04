import { Link } from "react-router-dom";

import { FaBed, FaUserFriends } from "react-icons/fa";

const iconClass =
  "min-w-10 min-h-10 rounded-lg shadow-md bg-gray-200 text-gray-400 flex items-center justify-center hover:bg-accent hover:text-white transition duration-100";

const RoomCard = ({ room }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Image */}
      <div className="lg:w-1/2">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-70 object-cover rounded-md"
        />
      </div>

      {/* Details */}
      <div className="lg:w-1/2 py-6">
        <div className="flex flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-serif text-gray-400 mb-4">
              {room.name}
            </h3>

            <p className="text-gray-400 mb-5 leading-7">{room.description}</p>

            <div className="flex gap-4 mb-6">
              <div className="flex whitespace-nowrap items-center gap-2 text-white">
                <FaUserFriends className="text-accent/60" />

                <span>
                  {" "}
                  <span>
                    {room?.capacity?.adults.length} Adults ·{" "}
                    {room?.capacity?.child.length} Childs{" "}
                  </span>
                </span>
              </div>

              <div className="flex whitespace-nowrap items-center gap-2 text-white">
                <FaBed className="text-accent/60" />

                <span>{room.beds} Beds</span>
              </div>
            </div>

            {/* Facilities */}
            <div className="flex gap-5 flex-wrap">
              {room.facilities.map((item, index) => {
                return (
                  <div key={index} title={item.title} className={iconClass}>
                    <span className="text-sm">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex w-45 flex-col items-center shadow-md border-none rounded-r-sm rounded-md bg-primary/40 px-5 py-6">
            <div className="mb-3 text-center">
              <p className="text-md text-white/45">Starting From</p>

              <h2 className="text-lg font-bold text-white/45">
                {room.price.toLocaleString()} MMK
                <span className="text-sm text-white/45"> / Night</span>
              </h2>
            </div>

            <Link to={`/rooms/${room._id || room.id}`}>
              <button className="bg-accent max-h-18 h-fit w-fit hover:bg-accent/60 text-white px-3 py-3 rounded-lg transition duration-100">
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
