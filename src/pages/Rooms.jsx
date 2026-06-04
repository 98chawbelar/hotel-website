import { useParams } from "react-router-dom";
import RoomBody from "../components/rooms/RoomBody";
import RoomHeader from "../components/rooms/RoomHeader";
import {
  useFetchAllRoomsQuery,
  useFetchRoomByIdQuery,
} from "../redux/features/rooms/roomsApi";

const Rooms = () => {
  const { id } = useParams();
  console.log("ROOM ID", id);

  const { data: room, isLoading, error } = useFetchAllRoomsQuery();
  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load room</p>;

  return (
    <>
      <RoomHeader room={room} />
      <RoomBody />
    </>
  );
};

export default Rooms;
