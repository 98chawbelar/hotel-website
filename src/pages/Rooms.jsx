import RoomBody from "../components/rooms/RoomBody";
import RoomHeader from "../components/rooms/RoomHeader";
import { useFetchAllRoomsQuery } from "../redux/features/rooms/roomsApi";

const Rooms = () => {
  const { data: room, isLoading, error } = useFetchAllRoomsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-2xl">
        Error fetching room details
      </div>
    );
  }
  const firstRoom = room[0];
  return (
    <>
      <RoomHeader room={firstRoom} />
      <RoomBody />
    </>
  );
};

export default Rooms;
