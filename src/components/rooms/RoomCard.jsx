import { Link } from "react-router-dom";
import { FaBed, FaUserFriends } from "react-icons/fa";

const RoomCard = ({ room }) => {
  const capacity = room?.capacity;
  console.log(room);
  console.log(room.capacity);
  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-primary/10 p-5 rounded-2xl">
      {/* Image */}
      <div className="lg:w-1/2">
        {room?.image ? (
          <img
            src={room.image}
            alt={room?.name}
            className="w-full h-70 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-70 bg-gray-200 rounded-md flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="lg:w-1/2 py-4">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
          {/* Left */}
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-300 mb-4">
              {room.name}
            </h3>

            <p className="text-gray-300 mb-5 leading-7">{room?.description}</p>

            {/* Info */}
            <div className="flex flex-wrap gap-5 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <FaUserFriends className="text-accent" />
                <span>
                  {capacity?.adults} Adults, {capacity?.child} Childs
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <FaBed className="text-accent" />
                <span>{room.size}</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="bg-primary text-white rounded-2xl px-6 py-8 flex flex-col justify-center items-center min-w-[180px]">
            <p className="text-sm text-white/70 mb-2">Starting From</p>

            <h2 className="text-2xl font-bold">
              {Number(room.price || 0).toLocaleString()} MMK
            </h2>

            <span className="text-sm text-white/70 mb-6">/ Night</span>

            <Link to={`/rooms/${room._id}`}>
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
