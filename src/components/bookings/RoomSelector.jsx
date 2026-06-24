import getBaseUrl from "../../utils/baseURL";
import { Card, CardTitle } from "./Shared";

const RoomSelector = ({ rooms = [], selectedRoom, setSelectedRoom }) => {
  const BASE_URL = getBaseUrl();

  const getImageUrl = (image) => {
    if (!image) return "https://placehold.co/600x400";

    if (Array.isArray(image)) {
      image = image[0];
    }

    if (typeof image === "object") {
      image = image.url || image.path || image.secure_url || "";
    }

    if (!image) return "https://placehold.co/600x400";

    if (image.startsWith("http")) {
      return image;
    }

    return `${BASE_URL}/${image.replace(/^\/+/, "")}`;
  };
  return (
    <Card>
      <CardTitle>Select Room Type</CardTitle>

      <div className="space-y-3">
        {rooms.map((room) => (
          <label
            key={room._id}
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer border transition duration-200 ${
              selectedRoom === room._id
                ? "border-accent bg-accent/10"
                : "border-white/10 bg-white/5 hover:border-white/30"
            }`}
          >
            <input
              type="radio"
              name="room"
              value={room._id}
              checked={selectedRoom === room._id}
              onChange={() => setSelectedRoom(room._id)}
              className="accent-accent shrink-0"
            />

            <img
              src={getImageUrl(room.images)}
              alt={room.name}
              className="w-16 h-12 object-cover rounded-lg shrink-0"
            />

            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {room.name} {room.roomNumber}
              </p>

              <p className="text-xs text-gray-400 truncate">
                {room.size} m² • {room.capacity?.adults || 0} Adults •{" "}
                {room.capacity?.child || 0} Child
              </p>
            </div>

            <span className="text-accent text-sm font-semibold whitespace-nowrap">
              {Number(room.basePrice || 0).toLocaleString()} MMK
            </span>
          </label>
        ))}
      </div>
    </Card>
  );
};

export default RoomSelector;
