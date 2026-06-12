import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchAllRoomsQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} from "../../../../redux/features/rooms/roomsApi";
import ImageUpload from "../../components/ImageUpload";

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
  const [formData, setFormData] = useState(null);

  const { data: rooms, isLoading, refetch } = useFetchAllRoomsQuery();
  const [deleteRoom] = useDeleteRoomMutation();
  const [updateRoom, { isLoading: updating }] = useUpdateRoomMutation();

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-accent";

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
      price: room.price,
      beds: room.beds,
      size: room.size,
      status: room.status,
      image: imageFile,

      capacity: {
        adults: room.capacity?.adults,
        child: room.capacity?.child,
      },
    });
  };

  // ================= CHANGE =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files?.[0];

    if (file) {
      setimageFile(file);
    }
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    // capacity
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

    // numbers
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

  // ================= INPUT =================
  const renderInput = ({ name, value, placeholder, type = "text" }) => (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={inputClass}
    />
  );

  if (isLoading) {
    return <div className="p-6 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="p-6  min-h-screen">
      <div className="grid grid-cols-1   sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms?.map((room) => (
          <div
            key={room._id}
            className=" rounded-lg shadow-md hover:shadow-2xl overflow-hidden border-0 backdrop:blur-md "
          >
            {/* IMAGE */}
            <img
              src={room.image}
              alt={room.name}
              className="w-full rounded-tl-none rounded-tr-none rounded-xl   h-52 sm:h-56 object-cover"
            />

            <div className="p-5">
              {editingRoom === room._id ? (
                <div className="space-y-3">
                  {renderInput({
                    name: "name",
                    value: formData.name,
                    placeholder: "Room Name",
                  })}

                  {/* CATEGORY */}
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {/* DESCRIPTION */}
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Room Description"
                    className={inputClass}
                  />

                  {renderInput({
                    name: "location",
                    value: formData.location,
                    placeholder: "Location",
                  })}

                  {renderInput({
                    name: "price",
                    value: formData.price,
                    placeholder: "Price",
                    type: "number",
                  })}

                  {renderInput({
                    name: "adults",
                    value: formData.capacity?.adults,
                    placeholder: "Adults Capacity",
                    type: "number",
                  })}

                  {renderInput({
                    name: "child",
                    value: formData.capacity?.child,
                    placeholder: "Child Capacity",
                    type: "number",
                  })}

                  {renderInput({
                    name: "beds",
                    value: formData.beds,
                    placeholder: "Beds",
                    type: "number",
                  })}

                  {renderInput({
                    name: "size",
                    value: formData.size,
                    placeholder: "Room Size",
                  })}

                  {/* STATUS */}
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <ImageUpload
                    title="Room Image"
                    image={room.imageFile}
                    onChange={handleChange}
                  />

                  {/* BUTTONS */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleUpdate(room._id)}
                      className="flex-1 bg-accent text-white py-2 rounded-lg font-semibold"
                    >
                      {updating ? "Saving..." : "Save"}
                    </button>

                    <button
                      onClick={() => setEditingRoom(null)}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
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
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <p className="text-sm text-gray-500 mb-2">{room.category}</p>

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
                    {room.price} MMK
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditClick(room)}
                      className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(room._id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRooms;
