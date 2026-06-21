import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import {
  useFetchAllRoomsQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} from "../../../../redux/features/rooms/roomsApi";

import RoomCard from "./RoomCard";

import PageHeader from "../../components/PageHeader";

import SubmitButton from "../../components/SubmitButton";
import getBaseUrl from "../../../../utils/baseURL";

const ActiveRooms = () => {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useFetchAllRoomsQuery();

  const rooms = data?.rooms || [];
  console.log("Room Images", rooms[0]?.images);

  const [deleteRoom] = useDeleteRoomMutation();

  const [updateRoom, { isLoading: updating }] = useUpdateRoomMutation();

  const [editingRoom, setEditingRoom] = useState(null);

  const [imageFiles, setImageFiles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    roomNumber: "",
    price: "",
    beds: "",
    size: "",
    status: "available",

    capacity: {
      adults: 0,
      child: 0,
    },
  });

  // ================= EDIT =================

  const handleEditClick = (room) => {
    setEditingRoom(room._id);

    setFormData({
      name: room.name,
      category: room.roomType,
      description: room.description,
      location: room.location,
      roomNumber: room.roomNumber,
      price: room.basePrice,
      beds: room.beds,
      size: room.size,
      status: room.status,

      capacity: {
        adults: room.capacity?.adults,
        child: room.capacity?.child,
      },
    });
  };

  // ================= CHANGE =================

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files?.length) {
      const selectedFiles = Array.from(files);

      setImageFiles(selectedFiles);

      return;
    }

    if (name === "adults" || name === "child") {
      setFormData((prev) => ({
        ...prev,

        capacity: {
          ...prev.capacity,
          [name]: Number(value),
        },
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= UPDATE =================

  const handleUpdate = async (id) => {
    try {
      const data = new FormData();

      data.append("name", formData.name);

      data.append("description", formData.description);

      data.append("location", formData.location);

      data.append("roomType", formData.category);

      data.append("status", formData.status);

      data.append("roomNumber", formData.roomNumber);

      data.append("basePrice", Number(formData.price));

      data.append("beds", Number(formData.beds));

      data.append("size", formData.size);

      data.append("capacity", JSON.stringify(formData.capacity));

      imageFiles.forEach((file) => {
        data.append("images", file);
      });

      await updateRoom({
        id,
        data,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Room Updated Successfully",
      });

      setEditingRoom(null);

      refetch();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Archive Room?",
      text: "Room will be moved to trash.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Archive",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteRoom(id).unwrap();

      Swal.fire({
        icon: "success",
        title: "Room Archived",
      });

      refetch();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
      });
    }
  };

  // ================= LOADING =================

  if (isLoading) {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }

  return (
    <div>
      <PageHeader
        title={"Manage Rooms"}
        subtitle={"Manage hotel rooms professionally."}
      />

      {rooms.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white mb-4">
            No Rooms Available
          </h2>

          <SubmitButton
            fullWidth={false}
            onClick={() => navigate("/dashboard/add-new-room")}
          >
            Add Room
          </SubmitButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {rooms?.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              editingRoom={editingRoom}
              setEditingRoom={setEditingRoom}
              formData={formData}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handleEditClick={handleEditClick}
              updating={updating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveRooms;
