import React from "react";

import { Card, CardTitle } from "./Shared";

const RoomSelector = ({ rooms, selectedRoom, setSelectedRoom }) => {
  return (
    <Card>
      <CardTitle>Select Room Type</CardTitle>

      <div className="space-y-2 sm:space-y-3">
        {rooms.map((r) => (
          <label
            key={r.id}
            className={`flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-xl cursor-pointer border transition duration-200 ${
              selectedRoom === r.id
                ? "border-accent bg-accent/10"
                : "border-white/10 bg-white/5 hover:border-white/30"
            }`}
          >
            <input
              type="radio"
              name="room"
              value={r.id}
              checked={selectedRoom === r.id}
              onChange={() => setSelectedRoom(r.id)}
              className="accent-accent shrink-0"
            />

            <img
              src={r.image}
              alt={r.name}
              className="w-12 h-10 sm:w-16 sm:h-12 object-cover rounded-lg shrink-0"
            />

            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs sm:text-sm truncate">
                {r.name}
              </p>

              <p className="text-xs text-gray-400 truncate">
                {r.size} · {r.capacity.adults}A ·{" "}
                {r.capacity.children}C
              </p>
            </div>

            <span className="text-accent text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0">
              {r.price.toLocaleString()} MMK
            </span>
          </label>
        ))}
      </div>
    </Card>
  );
};

export default RoomSelector;