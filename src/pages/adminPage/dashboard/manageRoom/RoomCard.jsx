import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import ImageUpload from "../../components/ImageUpload";
import SelectField from "../../dashboard/addRoom/SelectField";
import getBaseUrl from "../../../../utils/baseURL";

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
  { value: "maintenance", label: "Maintenance" },
  { value: "cleaning", label: "Cleaning" },
];

// -------- STATUS LOGIC --------
const getRoomState = (room) => {
  if (room.status === "maintenance") return "maintenance";
  if (room.status === "cleaning") return "cleaning";
  if (room.status === "reserved") return "reserved";
  return "available";
};

const getRoomStateStyle = (state) => {
  switch (state) {
    case "available":
      return "bg-green-500/20 text-green-400 border border-green-500/30";
    case "reserved":
      return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
    case "cleaning":
      return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
    case "maintenance":
      return "bg-orange-500/20 text-orange-300 border border-orange-500/30";
    default:
      return "bg-gray-500/20 text-gray-300";
  }
};

const RoomCard = ({
  room,
  editingRoom,
  setEditingRoom,
  formData,
  handleChange,
  handleUpdate,
  handleDelete,
  handleEditClick,
  handleStatusUpdate, // ✅ IMPORTANT
  updating,
}) => {
  const BASE_URL = getBaseUrl();

  const getImageUrl = (img) => {
    if (!img) return "";

    if (typeof img === "object") img = img.url || img.path || "";
    if (!img) return "";

    if (img.startsWith("http")) return img;

    return `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  const state = getRoomState(room); // ✅ FIXED (inside component)

  return (
    <div className="bg-gray-700 rounded-3xl overflow-hidden border border-white/10">
      {/* IMAGES */}
      <div className="flex gap-2 overflow-x-auto">
        {room?.images?.map((img, i) => (
          <img
            key={i}
            src={getImageUrl(img)}
            className="w-full h-fit object-cover rounded flex-shrink-0"
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
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">{room.name}</h2>

              <span
                className={`${getRoomStateStyle(state)} px-3 py-1 rounded-full text-xs font-semibold`}
              >
                {state}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handleStatusUpdate(room._id, "available")}
                className="px-3 py-1 bg-green-600 rounded text-white"
              >
                Ready
              </button>

              <button
                onClick={() => handleStatusUpdate(room._id, "cleaning")}
                className="px-3 py-1 bg-blue-600 rounded text-white"
              >
                Cleaning
              </button>

              <button
                onClick={() => handleStatusUpdate(room._id, "maintenance")}
                className="px-3 py-1 bg-orange-600 rounded text-white"
              >
                Maintenance
              </button>
              <p>{room.roomNumber}</p>
            </div>

            {/* DETAILS */}
            <p className="text-gray-300 mb-4">{room.description}</p>

            <div className="space-y-2 text-gray-400 text-sm">
              <p>📍 {room.location}</p>
              <p>👨 Adults: {room.capacity?.adults}</p>
              <p>👶 Child: {room.capacity?.child}</p>
              <p>🛏 Beds: {room.beds}</p>
              <p>📐 Size: {room.size}</p>
            </div>

            {/* FOOTER */}
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
