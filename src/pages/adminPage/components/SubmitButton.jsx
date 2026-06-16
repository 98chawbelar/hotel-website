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
        px-5 py-5 rounded-xl
        bg-accent/80 text-white hover:bg-accent
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
