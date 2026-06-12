import { useState } from "react";
import FormInput from "../../components/FormInput";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddRoomMutation } from "../../../../redux/features/rooms/roomsApi";
import Swal from "sweetalert2";
import SubmitButton from "../../components/SubmitButton";
import ImageUpload from "../../components/ImageUpload";

const AddRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [addRoom, { isLoading }] = useAddRoomMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("image", imageFile);
      formData.append("price", Number(data.price));

      formData.append("capacity[adults]", Number(data.adults));
      formData.append("capacity[child]", Number(data.child));

      formData.append("category", data.category);

      formData.append("status", data.status);

      formData.append("beds", data.beds);

      formData.append("size", data.size);

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
    }
  };
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white  rounded-md shadow-2xl">
      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for Title */}
        <FormInput
          label="Title"
          name="title"
          placeholder="Enter room title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <FormInput
          label="Description"
          name="description"
          placeholder="Enter room description"
          type="textarea"
          register={register}
        />
        {/* Reusable Textarea for Location */}
        <FormInput
          label="Location"
          name="location"
          placeholder="Enter room location"
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
        <FormInput
          label="Adults"
          name="adults"
          placeholder="1,2,3"
          register={register}
        />

        <FormInput
          label="Child"
          name="child"
          placeholder="1,2,3"
          register={register}
        />
        {/* Price */}
        <FormInput
          label="Price"
          name="price"
          type="number"
          placeholder="Room Price"
          register={register}
        />
        {/* Beds */}
        <FormInput
          label="Beds"
          name="beds"
          type="number"
          placeholder="How many beds?"
          register={register}
        />

        {/* Room Size */}
        <FormInput
          label="Room Size"
          name="size"
          placeholder="25 sqm"
          register={register}
        />

        {/* Status */}
        <SelectField
          label="Room Status"
          name="status"
          options={[
            { value: "available", label: "Available" },
            { value: "reserved", label: "Reserved" },
          ]}
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

        {/* Cover Image Upload */}
        <ImageUpload
          title="Cover Image"
          image={imageFile}
          onChange={handleFileChange}
        />

        {/* Submit Button */}
        <SubmitButton
          type="submit"
          loading={isLoading}
          loadingText="Adding Room..."
        >
          Add Room
        </SubmitButton>
      </form>
    </div>
  );
};

export default AddRoom;
