import Swal from "sweetalert2";

import {
  useFetchArchivedRoomsQuery,
  useRestoreRoomMutation,
  usePermanentDeleteRoomMutation,
} from "../../../../redux/features/rooms/roomsApi";

import PageHeader from "../../components/PageHeader";

import SubmitButton from "../../components/SubmitButton";
import getBaseUrl from "../../../../utils/baseURL";

const ArchivedRooms = () => {
  const { data: archivedData, refetch } = useFetchArchivedRoomsQuery();

  const archivedRooms = archivedData?.rooms || [];

  const [restoreRoom] = useRestoreRoomMutation();

  const [permanentDeleteRoom] = usePermanentDeleteRoomMutation();

  const BASE_URL = getBaseUrl();

  const handleRestore = async (id) => {
    try {
      await restoreRoom(id).unwrap();

      Swal.fire({
        icon: "success",
        title: "Room Restored Successfully",
      });

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePermanentDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Permanently?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete Forever",
    });

    if (!result.isConfirmed) return;

    try {
      await permanentDeleteRoom(id).unwrap();

      Swal.fire({
        icon: "success",
        title: "Room Deleted Forever",
      });

      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const getImageUrl = (img) => {
    if (!img) return "";
    if (typeof img === "object") img = img.url || img.path || "";
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  return (
    <div>
      <PageHeader
        title={"Archived Rooms"}
        subtitle={"Restore or permanently delete rooms."}
      />

      {archivedRooms.length === 0 ? (
        <div className="bg-gray-700 rounded-3xl p-10 text-center">
          <p className="text-gray-400">No archived rooms found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {archivedRooms.map((room) => (
            <div
              key={room._id}
              className="bg-gray-700 rounded-3xl overflow-hidden border border-red-500/20"
            >
              <img
                src={getImageUrl(room.images?.[0])}
                alt={room.name}
                className="w-full h-72 object-cover opacity-60"
              />

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">{room.name}</h2>

                  <span className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
                    Archived
                  </span>
                </div>

                <p className="text-gray-400 mb-5">{room.description}</p>

                <div className="flex gap-4">
                  <SubmitButton onClick={() => handleRestore(room._id)}>
                    Restore
                  </SubmitButton>

                  <SubmitButton
                    onClick={() => handlePermanentDelete(room._id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Forever
                  </SubmitButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArchivedRooms;
