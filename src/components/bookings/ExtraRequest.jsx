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
    <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
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
        <p className="text-xs sm:text-base font-normal truncate">{label}</p>
      </div>

      {/* PRICE */}
      <div className="shrink-0">
        {price > 0 ? (
          <p className="text-xs text-accent font-medium">
            {price.toLocaleString()} Ks
          </p>
        ) : (
          <p className="text-xs text-green-400 font-medium">Free</p>
        )}
      </div>
    </div>

    {/* CHECKBOX */}
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="accent-accent w-2 h-2 ml-1 shrink-0"
    />
  </label>
);

const ExtraRequests = ({
  extras,
  toggleExtra,
  specialRequests,
  setSpecialRequests,
  extraServices,
}) => {
  // FREE FACILITIES
  const freeFacilities = extraServices.filter((item) => item.price === 0);

  // PAID FACILITIES
  const paidFacilities = extraServices.filter((item) => item.price > 0);

  return (
    <div className="space-y-3 sm:space-y-5">
      {/* SERVICES */}
      <Card>
        <CardTitle icon={FaConciergeBell}>Extra Requests</CardTitle>

        <p className="text-gray-400 text-xs sm:text-base mb-5">
          Customize your stay with additional services
        </p>

        {/* FREE FACILITIES */}
        {freeFacilities.length > 0 && (
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">
              Complimentary Facilities
            </h3>

            {freeFacilities.map((service) => (
              <CheckRow
                key={service.key}
                icon={service.icon}
                label={service.label}
                desc={service.desc}
                price={service.price}
                checked={extras.includes(service.key)}
                onChange={() => toggleExtra(service.key)}
              />
            ))}
          </div>
        )}

        {/* PAID EXTRAS */}
        {paidFacilities.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-accent uppercase tracking-wide">
              Premium Extra Services
            </h3>

            {paidFacilities.map((service) => (
              <CheckRow
                key={service.key}
                icon={service.icon}
                label={service.label}
                desc={service.desc}
                price={service.price}
                checked={extras.includes(service.key)}
                onChange={() => toggleExtra(service.key)}
              />
            ))}
          </div>
        )}
      </Card>

      {/* SPECIAL REQUESTS */}
      <Card>
        <CardTitle>Special Requests</CardTitle>

        <p className="text-gray-400 text-xs sm:text-base">
          Any additional notes for our team
        </p>

        <textarea
          rows={4}
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="e.g. High floor, quiet room, baby cot needed..."
          className="w-full text-wrap bg-white/10 border border-white/10 rounded-xl p-3 text-base text-white placeholder-gray-500 outline-none focus:border-accent transition resize-none"
        />
      </Card>
    </div>
  );
};

export default ExtraRequests;
