// components/EmptyState.jsx

const EmptyState = ({ title, subtitle, buttonText, onClick }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-2xl font-bold text-primary mb-3">{title}</h2>

      <p className="text-gray-500 mb-6">{subtitle}</p>

      <button
        onClick={onClick}
        className="bg-accent text-white px-6 py-3 rounded-xl font-semibold"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EmptyState;
