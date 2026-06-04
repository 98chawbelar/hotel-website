import React from "react";
import {
  FaCreditCard,
  FaPaypal,
  FaMobileAlt,
  FaMoneyBillWave,
  FaAlipay,
} from "react-icons/fa";

import { Card, CardTitle } from "./Shared";

const paymentOptions = [
  { value: "credit_card", icon: FaCreditCard, label: "Credit Card" },
  { value: "paypal", icon: FaPaypal, label: "PayPal" },
  { value: "mobile", icon: FaMobileAlt, label: "Bank Transfer" },
  {value: "alipay", icon: FaAlipay , label: "AliPay"},
  {value:"cash", icon:FaMoneyBillWave,label:"Cash on Arrival"},
];

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <Card>
      <CardTitle icon={FaCreditCard}>Payment Method</CardTitle>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {paymentOptions.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setPaymentMethod(value)}
            className={`flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 rounded-xl border transition duration-200 ${
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