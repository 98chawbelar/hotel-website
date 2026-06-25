import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { FaPlus, FaEdit, FaTrash, FaImage, FaLayerGroup } from "react-icons/fa";

import {
  useFetchFacilitiesQuery,
  useCreateFacilitiesMutation,
  useUpdateFacilitiesMutation,
} from "../../../../redux/features/facilities/facilitiesApi";

import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import PageHeader from "../../components/PageHeader";
import Loading from "../../../../components/Loading";
import getBaseUrl from "../../../../utils/baseURL";

const AddFacilities = () => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const { data, isLoading } = useFetchFacilitiesQuery();

  const [createFacility, { isLoading: createLoading }] =
    useCreateFacilitiesMutation();

  const [updateFacility, { isLoading: updateLoading }] =
    useUpdateFacilitiesMutation();

  const [images, setImages] = useState([]);

  const [editing, setEditing] = useState(null);

  const BASE_URL = getBaseUrl();

  const getImageUrl = (img) => {
    if (!img) {
      return "https://placehold.co/600x400?text=No+Image";
    }

    // if object
    if (typeof img === "object") {
      img = img.url || img.path || "";
    }

    if (!img) {
      return "https://placehold.co/600x400?text=No+Image";
    }

    // already full URL
    if (img.startsWith("http")) {
      return img;
    }

    // if old DB data without /uploads
    if (!img.startsWith("/uploads")) {
      img = `/uploads/${img}`;
    }

    return `${BASE_URL}${img}`;
  };

  const facilities = Array.isArray(data)
    ? data
    : data?.facilities || data?.data || [];

  // IMAGE
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setImages(files);
    }
  };

  // SUBMIT
  const onSubmit = async (form) => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);

      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("pricingType", form.priceType);

      formData.append("link", form.link || "");

      formData.append("order", Number(form.order || 0));

      if (images.length > 0) {
        images.forEach((img) => {
          formData.append("images", img);
        });
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

      setImages([]);

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

  if (isLoading) return <Loading />;

  return (
    <section className="relative min-h-screen overflow-hidden rounded-xl bg-gray-600 px-4 sm:px-6 lg:px-8 py-8">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-175 bg-primary/20 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-400 mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <PageHeader
            title={editing ? "Update Facility" : "Manage Facilities"}
            subtitle="Create, update, and manage hotel facilities."
          />
        </div>

        {/* STATS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-[28px] p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary/55 text-sm">Total Facilities</p>

                <h2 className="text-4xl font-black text-white mt-2">
                  {facilities.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FaLayerGroup className="text-primary text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-[28px] p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary/55 text-sm">Images Uploaded</p>

                <h2 className="text-4xl font-black text-green-400 mt-2">
                  {facilities.reduce(
                    (total, facility) => total + (facility.images?.length || 0),
                    0,
                  )}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <FaImage className="text-green-400 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-[28px] p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary/55 text-sm">Add New</p>

                <h2 className="text-4xl font-black text-accent mt-2">
                  Facility
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <FaPlus className="text-accent text-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* FORM */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl p-6 mb-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Facility Name"
                name="name"
                type="input"
                register={register}
              />

              <FormInput
                label="Display Order"
                name="order"
                type="number"
                register={register}
              />
              <FormInput
                label="price"
                name="price"
                type="number"
                register={register}
              />
              <div className="w-full">
                <label className="block text-sm sm:text-base font-medium text-black mb-2">
                  Price Type
                </label>

                <select
                  {...register("priceType")}
                  className="
      w-full
      rounded-xl sm:rounded-2xl
      border border-secondary/10
      bg-secondary/10
      px-3 sm:px-4
      py-2.5 sm:py-3
      text-sm sm:text-base
      text-black
      outline-none
      transition
      focus:border-accent
      focus:bg-secondary/15
    "
                >
                  <option value="" className="bg-primary/60 text-white">
                    Select Price Type
                  </option>

                  <option
                    value="per_booking"
                    className="bg-primary/60 text-white"
                  >
                    per_booking
                  </option>

                  <option
                    value="per_night"
                    className="bg-primary/60 text-white"
                  >
                    per_night
                  </option>

                  <option
                    value="per_person"
                    className="bg-primary/60 text-white"
                  >
                    per_person
                  </option>
                </select>
              </div>
            </div>

            <FormInput
              label="Description"
              name="description"
              type="textarea"
              register={register}
            />

            <FormInput label="Facility Link" name="link" register={register} />

            <div className="space-y-4">
              <label className="block text-white font-semibold text-lg">
                Facility Images
              </label>

              <div className="border-2 border-dashed border-white/20 rounded-3xl p-6 bg-white/5">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-white cursor-pointer"
                />

                <p className="text-secondary/55 text-sm mt-3">
                  Upload multiple images for restaurant, breakfast, gym, spa,
                  pool, etc.
                </p>
              </div>

              {/* PREVIEW */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="w-full h-40 object-cover rounded-3xl"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setImages(images.filter((_, i) => i !== index))
                        }
                        className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <SubmitButton
              type="submit"
              loading={createLoading || updateLoading}
              loadingText="Saving..."
            >
              {editing ? "Update Facility" : "Add Facility"}
            </SubmitButton>
          </form>
        </div>

        {/* FACILITIES */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="uppercase tracking-[4px] text-accent text-xs mb-2">
                Hotel Facilities
              </p>

              <h2 className="text-3xl font-black text-secondary">
                Your Facilities
              </h2>
            </div>
          </div>

          {/* MOBILE */}
          <div className="grid gap-5 lg:hidden">
            {facilities.map((facility) => (
              <div
                key={facility._id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] overflow-hidden shadow-2xl"
              >
                {/* ALL IMAGES */}
                <div className="grid grid-cols-2 gap-2 p-2">
                  {facility.images?.map((img, index) => (
                    <img
                      key={index}
                      src={getImageUrl(img)}
                      alt={facility.name}
                      className="w-full h-44 sm:h-52 object-cover rounded-3xl"
                    />
                  ))}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {facility.name}
                    </h3>

                    <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                      #{facility.order}
                    </span>
                  </div>

                  <p className="text-secondary/55 mt-3 leading-7">
                    {facility.description}
                  </p>

                  <div className="mt-6">
                    <button
                      onClick={() => editHandler(facility)}
                      className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-primary text-white font-semibold"
                    >
                      <FaEdit />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:block overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10 bg-black/10">
                  <tr>
                    <th className="px-6 py-5 text-left text-secondary font-semibold">
                      Image
                    </th>

                    <th className="px-6 py-5 text-left text-secondary font-semibold">
                      Facility
                    </th>

                    <th className="px-6 py-5 text-left text-secondary font-semibold">
                      Description
                    </th>

                    <th className="px-6 py-5 text-left text-secondary font-semibold">
                      Order
                    </th>

                    <th className="px-6 py-5 text-center text-secondary font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {facilities.map((facility) => (
                    <tr
                      key={facility._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-all"
                    >
                      <td className="px-6 py-5">
                        <div className="flex gap-3 overflow-x-auto max-w-[420px]">
                          {facility.images?.map((img, index) => (
                            <img
                              key={index}
                              src={getImageUrl(img)}
                              alt={facility.name}
                              className="w-32 h-24 rounded-3xl object-cover flex-shrink-0"
                            />
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <h3 className="font-semibold text-white text-lg">
                          {facility.name}
                        </h3>
                      </td>

                      <td className="px-6 py-5 text-secondary max-w-sm">
                        {facility.description}
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                          #{facility.order}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => editHandler(facility)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-medium hover:scale-105 transition-all"
                          >
                            <FaEdit />
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div className="mt-12 text-center">
          <p className="text-secondary/35 text-xs tracking-[3px] uppercase">
            ©2026 Kandaw101Hotel Facility Management
          </p>
        </div>
      </div>
    </section>
  );
};

export default AddFacilities;
