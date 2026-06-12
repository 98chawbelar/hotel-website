// components/common/PageHeader.jsx

import { Link } from "react-router-dom";

const PageHeader = ({ title, subtitle, actionLabel, actionTo }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary">{title}</h1>

        {subtitle && <p className="text-primary/60 mt-2">{subtitle}</p>}
      </div>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="px-6 py-3 rounded-xl bg-accent text-primary font-semibold"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
