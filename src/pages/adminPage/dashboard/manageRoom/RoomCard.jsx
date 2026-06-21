import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import ImageUpload from "../../components/ImageUpload";
import SelectField from "../../dashboard/addRoom/SelectField";
import getBaseUrl from "../../../../utils/baseURL";
import { configureStore } from "@reduxjs/toolkit";
import { get } from "react-hook-form";

const categoryOptions = [
  { value: "Superior King", label: "Superior King" },
  { value: "Superior Twin", label: "Superior Twin" },
  { value: "Deluxe King", label: "Deluxe King" },
  { value: "Deluxe Twin", label: "Deluxe Twin" },
  { value: "Family", label: "Family" },
];

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
];

const RoomCard = ({
  room,

  editingRoom,
  setEditingRoom,
  formData,
  handleChange,
  handleUpdate,
  handleDelete,
  handleEditClick,
  updating,
}) => {
  const BASE_URL = getBaseUrl();
  const getImageUrl = (img) => {
    if (!img) return "";

    if (typeof img === "object") img = img.url || img.path || "";
    if (!img) return "";

    // already full URL from backend
    if (img.startsWith("http")) return img;

    // fallback for relative paths
    return `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  return (
    <div className="bg-gray-700 rounded-3xl overflow-hidden border border-white/10">
      {/* IMAGE */}

      <div className="flex gap-2 overflow-x-auto">
        {room?.images.map((img, i) => (
          <img
            key={i}
            src={getImageUrl(img)}
            className="w-full  h-fit object-cover rounded flex-shrink-0"
          />
        ))}
      </div>

      <div className="p-6">
        {editingRoom === room._id ? (
          <div className="space-y-4">
            <FormInput
              label="Room Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <FormInput
              label="Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <SelectField
              label="Category"
              name="category"
              options={categoryOptions}
              value={formData.category}
              onChange={handleChange}
            />

            <FormInput
              label="Room Number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
            />

            <FormInput
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <FormInput
              label="Beds"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
            />

            <FormInput
              label="Adults"
              name="adults"
              value={formData.capacity.adults}
              onChange={handleChange}
            />

            <FormInput
              label="Child"
              name="child"
              value={formData.capacity.child}
              onChange={handleChange}
            />

            <FormInput
              label="Room Size"
              name="size"
              value={formData.size}
              onChange={handleChange}
            />

            <SelectField
              label="Status"
              name="status"
              options={statusOptions}
              value={formData.status}
              onChange={handleChange}
            />

            <ImageUpload
              title="Room Images"
              images={formData.images || []}
              onChange={handleChange}
            />

            <div className="flex gap-4">
              <SubmitButton
                onClick={() => handleUpdate(room._id)}
                loading={updating}
                loadingText="Updating..."
              >
                Save Changes
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">{room.name}</h2>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  room.status === "available"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {room.status}
              </span>
            </div>

            <p className="text-gray-300 mb-4">{room.description}</p>

            <div className="space-y-2 text-gray-400 text-sm">
              <p>📍 {room.location}</p>

              <p>
                👨 Adults:
                {room.capacity?.adults}
              </p>

              <p>
                👶 Child:
                {room.capacity?.child}
              </p>

              <p>🛏 Beds: {room.beds}</p>

              <p>📐 Size: {room.size}</p>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <h3 className="text-3xl font-bold text-primary">
                {room.basePrice} Ks
              </h3>

              <div className="flex gap-3">
                <SubmitButton onClick={() => handleEditClick(room)}>
                  Edit
                </SubmitButton>

                <SubmitButton
                  onClick={() => handleDelete(room._id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Archive
                </SubmitButton>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
