import {
  FaClock,
  FaUtensils,
  FaSuitcase,
  FaParking,
  FaBus,
  FaConciergeBell,
} from "react-icons/fa";

import { Card, CardTitle } from "./Shared";


const CheckRow = ({ icon: Icon, label, price,desc, checked, onChange }) => (
  <label
    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition duration-200 ${
      checked
        ? "border-accent bg-accent/10"
        : "border-white/10 bg-white/5 hover:border-white/30"
    }`}
  >
    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
      <Icon
        className={`text-base sm:text-lg shrink-0 ${
          checked ? "text-accent" : "text-gray-400"
        }`}
      />

      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-medium truncate">{label}</p>
       
        <p className="text-xs text-gray-400 truncate">{desc}</p>
      </div>
      < p className="text-xs text-gray-200 mt-1">{price.toLocaleString()} MMK</p>
    </div>

    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="accent-accent w-4 h-4 ml-2 shrink-0"
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
  return (
    <div className="space-y-4 sm:space-y-8">
      <Card>
        <CardTitle icon={FaConciergeBell}>Extra Requests</CardTitle>

        <p className="text-gray-400 text-xs sm:text-sm">
          Customize your stay with additional services
        </p>

        {extraServices.map((service) => (
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
      </Card>

      <Card>
        <CardTitle>Special Requests</CardTitle>

        <p className="text-gray-400 text-xs sm:text-sm">
          Any additional notes for our team
        </p>

        <textarea
          rows={4}
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="e.g. High floor, quiet room, baby cot needed..."
          className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-accent transition resize-none"
        />
      </Card>
    </div>
  );
};

export default ExtraRequests;