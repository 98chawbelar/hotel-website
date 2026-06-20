import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

import {
  useFetchAllRoomsQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} from "../../../../redux/features/rooms/roomsApi";

import ImageUpload from "../../components/ImageUpload";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";

const categoryOptions = [
  "Superior King",
  "Superior Twin",
  "Deluxe King",
  "Deluxe Twin",
  "Family",
];

const statusOptions = ["available", "reserved"];

const ManageRooms = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageFile, setimageFile] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
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
    image: "",

    capacity: {
      adults: 0,
      child: 0,
    },
  });

  const { data, isLoading, refetch } = useFetchAllRoomsQuery();

  const rooms = data?.rooms || [];

  const [deleteRoom] = useDeleteRoomMutation();

  const [updateRoom, { isLoading: updating }] = useUpdateRoomMutation();

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Room?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteRoom(id).unwrap();

      Swal.fire({
        icon: "success",
        title: "Room Deleted Successfully",
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

  // ================= EDIT =================
  const handleEditClick = (room) => {
    navigate(`/dashboard/manage-room/${room._id}`);

    setEditingRoom(room._id);

    setFormData({
      name: room.name,
      category: room.category,
      description: room.description,
      location: room.location,
      roomNumber: room.roomNumber,
      price: room.price,
      beds: room.beds,
      size: room.size,
      status: room.status,
      image: room.images,

      capacity: {
        adults: room.capacity?.adults,
        child: room.capacity?.child,
      },
    });
  };

  // ================= CHANGE =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // image upload
    if (files && files[0]) {
      const file = files[0];

      setimageFile(file);

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      return;
    }

    // capacity fields
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

    // number fields
    if (name === "price" || name === "beds") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));

      return;
    }

    // normal fields
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
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("roomNumber", formData.roomNumber);
      data.append("price", formData.price);
      data.append("beds", formData.beds);
      data.append("size", formData.size);
      data.append("status", formData.status);

      data.append("capacity", JSON.stringify(formData.capacity));

      if (imageFile) {
        data.append("image", imageFile);
      }

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
    }
  };

  // ================= LOADING =================
  if (isLoading) {
    return <div className="p-6 text-center text-lg">Loading...</div>;
  }

  return (
    <div className=" min-h-screen rounded-4xl bg-secondary p-6 sm:p-8 mb-10 shadow-2xl">
      <PageHeader
        title={"Manage Rooms"}
        subtitle={"View and manage all hotel rooms."}
      />

      {/* EMPTY STATE */}
      {rooms?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-bold text-white  mb-3">
            No Rooms Available
          </h2>

          <p className="text-gray-500 mb-6">
            Please add rooms from Add Room page.
          </p>

          <SubmitButton
            fullWidth={false}
            onClick={() => navigate("/dashboard/add-new-room")}
          >
            Add Room
          </SubmitButton>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {rooms?.map((room) => (
            <div
              key={room._id}
              className="rounded-xl shadow-md hover:shadow-2xl overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={room.images}
                alt={room.name}
                className="w-full h-52 sm:h-56 object-cover"
              />

              <div className="p-5">
                {editingRoom === room._id ? (
                  <div className="space-y-3">
                    <FormInput
                      label="Room Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Room Name"
                    />

                    {/* CATEGORY */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>

                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 outline-none"
                      >
                        {categoryOptions.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* DESCRIPTION */}
                    <FormInput
                      label="Description"
                      name="description"
                      type="textarea"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Room Description"
                    />

                    <FormInput
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Location"
                    />
                    <FormInput
                      label="roomNumber"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      placeholder="roomNumber"
                    />

                    <FormInput
                      label="Price"
                      name="price"
                      type="text"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Price"
                    />

                    <FormInput
                      label="Adults Capacity"
                      name="adults"
                      type="number"
                      value={formData.capacity?.adults}
                      onChange={handleChange}
                      placeholder="Adults Capacity"
                    />

                    <FormInput
                      label="Child Capacity"
                      name="child"
                      type="number"
                      value={formData.capacity?.child}
                      onChange={handleChange}
                      placeholder="Child Capacity"
                    />

                    <FormInput
                      label="Beds"
                      name="beds"
                      type="number"
                      value={formData.beds}
                      onChange={handleChange}
                      placeholder="Beds"
                    />

                    <FormInput
                      label="Room Size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder="Room Size"
                    />

                    {/* STATUS */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>

                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 outline-none"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* IMAGE */}
                    <ImageUpload
                      title="Room Image"
                      image={formData.image}
                      onChange={handleChange}
                    />

                    {/* BUTTONS */}
                    <div className="flex gap-3 pt-2">
                      <SubmitButton
                        onClick={() => handleUpdate(room._id)}
                        loading={updating}
                        loadingText="Saving..."
                      >
                        Save
                      </SubmitButton>

                      <SubmitButton
                        onClick={() => setEditingRoom(null)}
                        className="bg-gray-500 hover:bg-gray-600"
                      >
                        Cancel
                      </SubmitButton>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* HEADER */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-primary">
                        {room.name}
                      </h3>

                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          room.status === "available"
                            ? "bg-green-500 text-green-700"
                            : "bg-red-500 text-red-600"
                        }`}
                      >
                        {room.status}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <p className="text-sm text-gray-500 mb-2">
                      {room.category}
                    </p>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {room.description}
                    </p>

                    <p className="text-sm text-gray-500 mb-2">
                      📍 {room.location}
                    </p>

                    <p className="text-sm text-gray-500 mb-2">
                      👨 Adults: {room.capacity?.adults}
                    </p>

                    <p className="text-sm text-gray-500 mb-2">
                      👶 Child: {room.capacity?.child}
                    </p>

                    <p className="text-sm text-gray-500 mb-2">
                      🛏 Beds: {room.beds}
                    </p>

                    <p className="text-sm text-gray-500 mb-2">
                      📐 Size: {room.size}
                    </p>

                    <p className="text-2xl font-bold text-accent mb-4">
                      {room.basePrice} MMK
                    </p>

                    {/* ACTIONS */}
                    <div className="flex gap-3">
                      <SubmitButton onClick={() => handleEditClick(room)}>
                        Edit
                      </SubmitButton>

                      <SubmitButton
                        onClick={() => handleDelete(room._id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </SubmitButton>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageRooms;
