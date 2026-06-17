const StatCard = ({
  title,
  value,
  icon,
  borderColor = "border-secondary",
  iconBg = "bg-secondary/10",
  iconColor = "text-secondary/50",
  titleColor = "text-secondary/50",
  valueColor = "text-secondary",

  cardBg = "bg-secondary/10",
}) => {
  return (
    <div
      className={`
         rounded-xl shadow-lg
        p-3 sm:p-4
        border-l-2 ${borderColor}
        
        hover:shadow-xl
        transition-all duration-300
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className={`${titleColor} text-sm sm:text-base`}>{title}</p>

          <h2
            className={`${valueColor} text-xl sm:text-2xl font-bold mt-2 wrap-break-word`}
          >
            {value}
          </h2>
        </div>

        <div
          className={`
            ${iconBg}
            p-2
            rounded-xl
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
