import { FaConciergeBell, FaCheckCircle } from "react-icons/fa";

import { Card, CardTitle } from "./Shared";

const CheckRow = ({ icon: Icon, label, price, desc, checked, onChange }) => (
  <label
    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition duration-200 ${
      checked
        ? "border-accent bg-accent/10"
        : "border-white/10 bg-white/5 hover:border-white/30"
    }`}
  >
    {/* LEFT */}
    <div className="flex items-center gap-2 flex-1 min-w-0">
      {/* ICON */}
      <div className="shrink-0">
        {Icon ? (
          <Icon
            className={`text-base sm:text-lg ${
              checked ? "text-accent" : "text-gray-400"
            }`}
          />
        ) : (
          <FaCheckCircle
            className={`text-xs sm:text-base ${
              checked ? "text-accent" : "text-gray-400"
            }`}
          />
        )}
      </div>

      {/* TEXT */}
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-medium truncate">{label}</p>

        {desc && (
          <p className="text-[11px] sm:text-xs text-white/50 truncate">
            {desc}
          </p>
        )}
      </div>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-3 shrink-0 ml-3">
      {/* PRICE */}
      {price > 0 ? (
        <p className="text-xs text-accent font-semibold whitespace-nowrap">
          {price.toLocaleString()} Ks
        </p>
      ) : (
        <p className="text-xs text-green-400 font-semibold whitespace-nowrap">
          Free
        </p>
      )}

      {/* CHECKBOX */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-accent w-4 h-4 shrink-0"
      />
    </div>
  </label>
);

const ExtraRequests = ({
  extras,
  toggleExtra,

  extraServices = [],
}) => {
  // FREE FACILITIES
  const complimentaryFacilities = extraServices.filter(
    (item) => Number(item.price) === 0,
  );

  // PAID SERVICES
  const premiumServices = extraServices.filter(
    (item) => Number(item.price) > 0,
  );

  return (
    <div className="space-y-5">
      {/* SERVICES */}
      <Card>
        <CardTitle icon={FaConciergeBell}>Extra Requests</CardTitle>

        <p className="text-gray-400 text-xs sm:text-base mb-6">
          Customize your stay with additional services
        </p>

        {/* 50 / 50 LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FREE */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wide">
              Complimentary Facilities
            </h3>

            {complimentaryFacilities.length > 0 ? (
              complimentaryFacilities.map((service) => (
                <CheckRow
                  key={service.key}
                  icon={service.icon}
                  label={service.label}
                  desc={service.desc}
                  price={service.price}
                  checked={extras.includes(service.key)}
                  onChange={() => toggleExtra(service.key)}
                />
              ))
            ) : (
              <p className="text-white/40 text-sm">
                No complimentary facilities
              </p>
            )}
          </div>

          {/* PAID */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">
              Premium Extra Services
            </h3>

            {premiumServices.length > 0 ? (
              premiumServices.map((service) => (
                <CheckRow
                  key={service.key}
                  icon={service.icon}
                  label={service.label}
                  desc={service.desc}
                  price={service.price}
                  checked={extras.includes(service.key)}
                  onChange={() => toggleExtra(service.key)}
                />
              ))
            ) : (
              <p className="text-white/40 text-sm">No premium services</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExtraRequests;
