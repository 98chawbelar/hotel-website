import { useParams } from "react-router-dom";

import RoomBody from "../components/rooms/RoomBody";
import RoomHeader from "../components/rooms/RoomHeader";

import { useFetchRoomByIdQuery } from "../redux/features/rooms/roomsApi";

const Rooms = () => {
  const { id } = useParams();

  console.log("ROOM ID:", id);

  const { data: room, isLoading, error } = useFetchRoomByIdQuery(id);

  if (isLoading) {
    return <div className="text-white text-center py-20">Loading room...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-20">Failed to load room</div>
    );
  }

  return (
    <>
      <RoomHeader room={room} />

      <RoomBody />
    </>
  );
};

export default Rooms;
