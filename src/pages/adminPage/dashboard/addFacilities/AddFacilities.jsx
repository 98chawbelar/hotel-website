import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import {
  useFetchFacilitiesQuery,
  useCreateFacilitiesMutation,
  useUpdateFacilitiesMutation,
  useDeleteFacilitiesMutation,
} from "../../../../redux/features/facilities/facilitiesApi";

import FormInput from "../../components/FormInput";
import ImageUpload from "../../components/ImageUpload";
import SubmitButton from "../../components/SubmitButton";
import PageHeader from "../../components/PageHeader";

const AddFacilities = () => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const { data, isLoading } = useFetchFacilitiesQuery();

  const [createFacility, { isLoading: createLoading }] =
    useCreateFacilitiesMutation();

  const [updateFacility, { isLoading: updateLoading }] =
    useUpdateFacilitiesMutation();

  const [deleteFacility] = useDeleteFacilitiesMutation();

  const [images, setImages] = useState(null);

  const [editing, setEditing] = useState(null);

  const facilities = Array.isArray(data) ? data : [];

  // IMAGE

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImages(file);
    }
  };

  // SUBMIT
  const onSubmit = async (form) => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);

      formData.append("description", form.description);

      formData.append("link", form.link || "");

      formData.append("order", Number(form.order || 0));

      if (images) {
        formData.append("images", images);
      }

      if (editing) {
        await updateFacility({
          id: editing,
          data: formData,
        }).unwrap();

        Swal.fire("Updated", "Facility updated successfully", "success");
      } else {
        await createFacility(formData).unwrap();

        Swal.fire("Created", "Facility added successfully", "success");
      }

      reset();

      setImage(null);

      setEditing(null);
    } catch (error) {
      console.log(error);

      Swal.fire("Error", error?.data?.message || "Failed", "error");
    }
  };

  // EDIT

  const editHandler = (item) => {
    setEditing(item._id);

    setValue("name", item.name);

    setValue("description", item.description);

    setValue("link", item.link);

    setValue("order", item.order);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE

  const deleteHandler = async (id) => {
    const confirm = await Swal.fire({
      title: "Disable facility?",

      icon: "warning",

      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteFacility(id).unwrap();

      Swal.fire("Deleted", "Facility disabled", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto rounded-md p-6 bg-linear-to-r  from-transparent via-primary/20 to-transparent bg-primary/40 sm:p-8 mb-10">
      <PageHeader
        title={editing ? "Update Facility" : "Add New Facility"}
        subtitle="Manage hotel facilities"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="

rounded-2xl
shadow-md
p-6
mb-8
"
      >
        <FormInput label="Facility Name" name="name" register={register} />

        <FormInput
          label="Description"
          name="description"
          type="textarea"
          register={register}
        />

        <FormInput label="Facility Link" name="link" register={register} />

        <FormInput
          label="Display Order"
          name="order"
          type="number"
          register={register}
        />

        <ImageUpload
          title="Facility Images"
          images={images}
          onChange={handleFileChange}
        />

        <SubmitButton
          type="submit"
          loading={createLoading || updateLoading}
          loadingText="Saving..."
        >
          {editing ? "Update Facility" : "Add Facility"}
        </SubmitButton>
      </form>

      <h2
        className="
text-2xl
font-bold
mb-5
"
      >
        Your Facilities
      </h2>

      <div
        className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-5
"
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          facilities.map((facility) => (
            <div
              key={facility._id}
              className="

rounded-2xl
shadow-2xl
overflow-hidden
"
            >
              <img
                src={facility.images}
                className="
w-full
h-48
object-cover
"
              />

              <div className="p-4">
                <h3
                  className="
font-bold
text-xl
"
                >
                  {facility.name}
                </h3>

                <p
                  className="
text-gray-500
mt-2
"
                >
                  {facility.description}
                </p>

                <div
                  className="
flex
gap-3
mt-5
"
                >
                  <button
                    onClick={() => editHandler(facility)}
                    className="
bg-blue-500
text-secondary/90
px-4
py-2
rounded-lg
"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteHandler(facility._id)}
                    className="
                  bg-red-500
text-secondary/90
px-4
py-2
rounded-lg
"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddFacilities;
