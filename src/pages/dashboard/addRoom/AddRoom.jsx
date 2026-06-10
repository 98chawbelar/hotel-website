import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddRoomMutation } from "../../../redux/features/rooms/roomsApi";
import Swal from "sweetalert2";

const AddRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [addRoom, { isLoading }] = useAddRoomMutation();
  const [imageFileName, setimageFileName] = useState("");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.title);
      formData.append("description", data.description);
      formData.append("image", imageFile);
      formData.append("price", Number(data.newPrice));

      formData.append(
        "capacity",
        JSON.stringify({
          adults: Number(data.adults),

          child: Number(data.child),
        }),
      );

      formData.append("category", data.category);

      formData.append("status", "available");

      formData.append("beds", 1);

      formData.append("size", "25 sqm");

      console.log([...formData]);
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await addRoom(formData).unwrap();

      Swal.fire({
        icon: "success",
        title: "Room Added Successfully",
      });

      reset();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed to add room",
      });
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  };
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Room</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter room title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter room description"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "Superior King", label: "Superior King Room" },
            { value: "Superior Twin", label: "Superior Twin Room" },
            { value: "Deluxe King", label: "Deluxe King Room" },
            { value: "Deluxe Twin", label: "Deluxe Twin Room" },
            { value: "Family", label: "Family Room" },

            // Add more options as needed
          ]}
          register={register}
        />
        <InputField
          label="Adults Capacity"
          name="adults"
          placeholder="1,2,3"
          register={register}
        />

        <InputField
          label="Children Capacity"
          name="child"
          placeholder="1,2,3"
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Most Tranding Room
            </span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? (
            <span className="">Adding.. </span>
          ) : (
            <span>Add Room</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
