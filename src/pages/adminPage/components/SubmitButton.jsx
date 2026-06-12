const SubmitButton = ({
  children = "Submit",
  loading = false,
  loadingText = "Saving...",
  disabled = false,
  fullWidth = true,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${fullWidth ? "w-full" : ""}
        px-4 py-3 rounded-xl
        bg-blue-600 text-white hover:bg-blue-800
        font-semibold
        transition-all duration-300
        hover:opacity-90
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default SubmitButton;
