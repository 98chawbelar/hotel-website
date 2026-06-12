const FormInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  rows = 4,
  required = false,
  register,
}) => {
  const inputClass =
    "w-full border border-gray-300 rounded-xl p-3 outline-none focuse:border-none";

  return (
    <div className="space-y-2 mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={name}
          placeholder={placeholder}
          rows={rows}
          {...register(name)}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={inputClass}
        />
      )}
    </div>
  );
};

export default FormInput;
