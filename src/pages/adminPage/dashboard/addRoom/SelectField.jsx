const SelectField = ({ label, name, options, register }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold  ">{label}</label>
      <select
        {...register(name, { required: true })}
        className="w-full   p-2 border rounded-md focus:outline-none "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
