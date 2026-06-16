const FormInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  rows = 4,
  required = false,
  register,
  value,
  onChange,
}) => {
  const inputClass =
    "w-full border boder-0  rounded-xl p-3 outline-none focuse:border-none";

  return (
    <div className="space-y-2 mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium ">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
          {...(register ? register(name) : {})}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...(register ? register(name) : {})}
          className={inputClass}
        />
      )}
    </div>
  );
};

export default FormInput;
