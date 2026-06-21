import RoomBody from "../components/rooms/RoomBody";
import RoomHeader from "../components/rooms/RoomHeader";
import { useFetchAllRoomsQuery } from "../redux/features/rooms/roomsApi";

const Rooms = () => {
  const { data, isLoading, error } = useFetchAllRoomsQuery();
  const rooms = Array.isArray(data) ? data : data?.rooms || [];

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

  return (
    <>
      <RoomHeader rooms={rooms} />
      <RoomBody />
    </>
  );
};

export default Rooms;
