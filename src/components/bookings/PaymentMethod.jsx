import {
  FaCreditCard,
  FaMobileAlt,
  FaMoneyBillWave,
  FaUniversity,
} from "react-icons/fa";

import { Card, CardTitle } from "./Shared";

const paymentOptions = [
  {
    value: "cash",
    icon: FaMoneyBillWave,
    label: "Cash",
  },

  {
    value: "kbzpay",
    icon: FaMobileAlt,
    label: "KBZ Pay",
  },

  {
    value: "wavepay",
    icon: FaMobileAlt,
    label: "Wave Pay",
  },

  {
    value: "stripe",
    icon: FaCreditCard,
    label: "Stripe",
  },

  {
    value: "bank_transfer",
    icon: FaUniversity,
    label: "Bank Transfer",
  },
];

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <Card>
      <CardTitle icon={FaCreditCard}>Payment Method</CardTitle>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {paymentOptions.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setPaymentMethod(value)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition ${
              paymentMethod === value
                ? "border-accent bg-accent/10 text-accent"
                : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30"
            }`}
          >
            <Icon className="text-xl sm:text-2xl" />

            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default PaymentMethod;
