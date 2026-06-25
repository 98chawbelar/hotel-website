import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaPlus, FaEdit, FaLayerGroup, FaToggleOn } from "react-icons/fa";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import PageHeader from "../../components/PageHeader";
import Loading from "../../../../components/Loading";
import {
  useCreateExtraFacilityMutation,
  useFetchExtraFacilitiesQuery,
  useToggleExtraFacilityMutation,
  useUpdateExtraFacilityMutation,
} from "../../../../redux/features/extrafacilities/extraFacilitiesApi";

const AddExtraFacilities = () => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const { data, isLoading } = useFetchExtraFacilitiesQuery();

  const [createExtraFacility, { isLoading: createLoading }] =
    useCreateExtraFacilityMutation();

  const [updateExtraFacility, { isLoading: updateLoading }] =
    useUpdateExtraFacilityMutation();

  const [toggleExtraFacility] = useToggleExtraFacilityMutation();

  const [editing, setEditing] = useState(null);

  const extrafacilities = Array.isArray(data)
    ? data
    : data?.extrafacilities || [];

  // SUBMIT
  const onSubmit = async (form) => {
    try {
      const payload = {
        key: form.key,

        icon: form.icon,

        label: form.label,

        desc: form.desc,

        maxQuantity: Number(form.maxQuantity),

        availableFor: form.availableFor,

        order: Number(form.order || 0),
      };

      if (editing) {
        await updateExtraFacility({
          id: editing,

          data: payload,
        }).unwrap();

        Swal.fire("Updated", "Facility updated successfully", "success");
      } else {
        await createExtraFacility(payload).unwrap();

        Swal.fire("Created", "Facility created successfully", "success");
      }

      reset();

      setEditing(null);
    } catch (error) {
      Swal.fire("Error", error?.data?.message || "Failed", "error");
    }
  };

  // EDIT
  const editHandler = (item) => {
    setEditing(item._id);

    setValue("key", item.key);

    setValue("icon", item.icon);

    setValue("label", item.label);

    setValue("desc", item.desc);

    setValue("maxQuantity", item.maxQuantity);

    setValue("availableFor", item.availableFor);

    setValue("order", item.order);

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  // STATUS

  const statusHandler = async (item) => {
    await toggleExtraFacility({
      id: item._id,

      isActive: !item.isActive,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <section className="min-h-screen bg-gray-600 rounded-4xl p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title={editing ? "Update Extra Facility" : "Manage Extra Facilities"}
          subtitle="Create and manage hotel extra services"
        />

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="bg-white/10 p-6 rounded-3xl">
            <p className="text-white/60">Total Extra-Facilities</p>

            <h2 className="text-4xl font-black text-white">
              {extrafacilities.length}
            </h2>

            <FaLayerGroup className="text-primary text-3xl" />
          </div>

          <div className="bg-white/10 p-6 rounded-3xl">
            <p className="text-white/60">Active</p>

            <h2 className="text-4xl font-black text-green-400">
              {extrafacilities.filter((x) => x.isActive).length}
            </h2>
          </div>

          <div className="bg-white/10 p-6 rounded-3xl">
            <p className="text-white/60">Create New</p>

            <FaPlus className="text-accent text-3xl" />
          </div>
        </div>

        {/* FORM */}

        <div className="bg-white/10 p-6 rounded-3xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput label="Key" name="key" register={register} />

              <FormInput label="Icon Name" name="icon" register={register} />

              <FormInput label="Label" name="label" register={register} />
            </div>

            <FormInput
              label="Description"
              name="desc"
              type="textarea"
              register={register}
            />

            <div className="grid md:grid-cols-3 gap-5">
              <FormInput
                label="Max Quantity"
                name="maxQuantity"
                type="number"
                register={register}
              />

              <FormInput
                label="Order"
                name="order"
                type="number"
                register={register}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                availableFor
              </label>

              <select
                {...register("availableFor")}
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
                <option value="all" className="bg-primary/60 text-white">
                  all
                </option>

                <option value="room" className="bg-primary/60 text-white">
                  room
                </option>

                <option value="guest" className="bg-primary/60 text-white">
                  guest
                </option>
              </select>
            </div>

            <SubmitButton
              type="submit"
              loading={createLoading || updateLoading}
            >
              {editing ? "Update Extra - Facility" : "Create Extra - Facility"}
            </SubmitButton>
          </form>
        </div>

        {/* TABLE */}

        <div className="mt-10">
          <div className="overflow-x-auto rounded-3xl border border-white/10">
            <table className="min-w-full bg-white/10 text-white">
              {/* HEAD */}
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Label
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Key
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold whitespace-nowrap">
                    Available
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold whitespace-nowrap">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {extrafacilities.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`border-t border-white/10 transition hover:bg-white/5 ${
                      index % 2 === 0 ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    {/* LABEL */}
                    <td className="px-6 py-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm sm:text-base">
                          {item.label}
                        </span>

                        {item.desc && (
                          <span className="text-xs text-wrap text-white/50 mt-1 line-clamp-2">
                            {item.desc}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* KEY */}
                    <td className="px-6 py-4 align-middle">
                      <span className="text-sm text-white/80 break-words">
                        {item.key}
                      </span>
                    </td>

                    {/* AVAILABLE */}
                    <td className="px-6 py-4 text-center align-middle">
                      <span className="text-sm">
                        {item.availableFor || "-"}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4 text-center align-middle">
                      <button
                        type="button"
                        onClick={() => statusHandler(item)}
                        className="inline-flex items-center justify-center"
                      >
                        <FaToggleOn
                          className={`text-2xl transition ${
                            item.isActive
                              ? "text-green-400"
                              : "text-red-400 opacity-70"
                          }`}
                        />
                      </button>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-center align-middle">
                      <button
                        type="button"
                        onClick={() => editHandler(item)}
                        className="inline-flex items-center justify-center bg-primary hover:bg-primary/80 transition px-4 py-2 rounded-xl"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddExtraFacilities;
