// components/common/PageHeader.jsx

import { Link } from "react-router-dom";

const PageHeader = ({ title, subtitle, actionLabel, actionTo }) => {
  return (
    <div className="flex flex-col  lg:flex-row items-center  text-gray-600 justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold ">{title}</h1>

        {subtitle && <p className="text-gray-400 mt-2">{subtitle}</p>}
      </div>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="px-6 py-3 rounded-xl bg-accent text-gray-600 font-semibold"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
