const SelectField = ({ label, name, options, register, value, onChange }) => {
  // if a controlled value/onChange pair is given, use that and ignore register
  const controlledProps = register ? register(name) : { name, value, onChange };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold">{label}</label>

      <select
        {...controlledProps}
        className="w-full p-2 border rounded-md focus:outline-none"
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
