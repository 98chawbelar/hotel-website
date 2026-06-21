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
} from "../../../../redux/features/extrafacilities/extrafacilitiesApi";

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

        price: Number(form.price),

        pricingType: form.pricingType,

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

    setValue("price", item.price);

    setValue("pricingType", item.pricingType);

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
    <section className="min-h-screen bg-gray-600 rounded-xl p-6">
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

              <FormInput
                label="Price"
                name="price"
                type="number"
                register={register}
              />
            </div>

            <FormInput
              label="Description"
              name="desc"
              type="textarea"
              register={register}
            />

            <div className="grid md:grid-cols-3 gap-5">
              <FormInput
                label="Pricing Type"
                name="pricingType"
                register={register}
              />

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

            <FormInput
              label="Available For"
              name="availableFor"
              register={register}
            />

            <SubmitButton
              type="submit"
              loading={createLoading || updateLoading}
            >
              {editing ? "Update Extra - Facility" : "Create Extra - Facility"}
            </SubmitButton>
          </form>
        </div>

        {/* TABLE */}

        <div className="mt-10 overflow-x-auto">
          <table className="w-full bg-white/10 rounded-3xl overflow-hidden">
            <thead>
              <tr className="text-white/70">
                <th className="p-4">Label</th>

                <th>Key</th>

                <th>Price</th>

                <th>Type</th>

                <th>Available</th>

                <th>Status</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {extrafacilities.map((item) => (
                <tr
                  key={item._id}
                  className="text-white border-t border-white/10"
                >
                  <td className="p-4">{item.label}</td>

                  <td>{item.key}</td>

                  <td>{item.price} Ks</td>

                  <td>{item.pricingType}</td>

                  <td>{item.availableFor}</td>

                  <td>
                    <button onClick={() => statusHandler(item)}>
                      <FaToggleOn
                        className={
                          item.isActive
                            ? "text-green-400 text-2xl"
                            : "text-red-400 text-2xl"
                        }
                      />
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => editHandler(item)}
                      className="bg-primary px-4 py-2 rounded-xl"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AddExtraFacilities;
