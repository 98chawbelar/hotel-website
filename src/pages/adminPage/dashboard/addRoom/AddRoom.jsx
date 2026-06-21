import { useState } from "react";
import FormInput from "../../components/FormInput";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddRoomMutation } from "../../../../redux/features/rooms/roomsApi";
import Swal from "sweetalert2";
import SubmitButton from "../../components/SubmitButton";
import ImageUpload from "../../components/ImageUpload";
import PageHeader from "../../components/PageHeader";

const AddRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFiles, setImageFiles] = useState([]);
  const [addRoom, { isLoading }] = useAddRoomMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.title);

      formData.append("description", data.description);

      formData.append("location", data.location);

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      formData.append("basePrice", Number(data.price));

      formData.append(
        "capacity",
        JSON.stringify({
          adults: Number(data.adults),
          child: Number(data.child),
        }),
      );

      formData.append("roomType", data.category);

      formData.append("status", data.status);

      formData.append("beds", Number(data.beds));

      formData.append("size", data.size);

      formData.append("roomNumber", data.roomNumber);

      formData.append("trending", data.trending);

      await addRoom(formData).unwrap();

      Swal.fire({
        icon: "success",
        title: "Room Added Successfully",
      });

      reset();

      setImageFiles([]);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: error?.data?.message || "Failed",
      });
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setImageFiles(files);
  };
  return (
    <section className="relative min-h-screen overflow-hidden rounded-4xl bg-gray-600 px-4 sm:px-6 lg:px-8 py-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-175 bg-primary/20 blur-[180px] rounded-full" />
      <div className="relative z-10 max-w-400 mx-auto">
        <PageHeader
          title={"Add New Room"}
          subtitle={"Add new room for hotel."}
        />
        {/* Form starts here */}
        <form onSubmit={handleSubmit(onSubmit)}>
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
          {/* Room Number */}
          <FormInput
            label="Room Number"
            name="roomNumber"
            type="number"
            placeholder="101"
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
                className="rounded  focus-visible:not-enable "
              />
              <span className="ml-2 text-sm font-semibold text-gray-400">
                Most Tranding Room
              </span>
            </label>
          </div>

          {/* Cover Image Upload */}
          <ImageUpload
            title="Cover Image"
            images={imageFiles}
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
    </section>
  );
};

export default AddRoom;
