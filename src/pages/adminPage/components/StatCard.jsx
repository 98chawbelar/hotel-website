const StatCard = ({
  title,
  value,
  icon,
  borderColor = "border-primary",
  iconBg = "bg-primary/10",
  iconColor = "text-primary",
}) => {
  return (
    <div
      className={`
         rounded-3xl shadow-lg
        p-5 sm:p-6
        border-l-2 ${borderColor}
        hover:shadow-2xl
        transition-all duration-300
      `}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className=" text-sm sm:text-base">{title}</p>

          <h2 className="text-2xl sm:text-3xl font-bold  mt-2 wrap-break-word">
            {value}
          </h2>
        </div>

        <div
          className={`
            ${iconBg}
            p-4
            rounded-2xl
            shrink-0
          `}
        >
          <div className={`text-2xl ${iconColor}`}>{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
