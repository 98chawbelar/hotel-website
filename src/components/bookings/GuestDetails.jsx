import React from "react";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";

import { Card, CardTitle } from "./Shared";

const guestFields = [
  {
    key: "firstName",
    icon: FaUser,
    label: "First Name",
    placeholder: "John",
    type: "text",
  },
  {
    key: "lastName",
    icon: FaUser,
    label: "Last Name",
    placeholder: "Doe",
    type: "text",
  },
  {
    key: "email",
    icon: FaEnvelope,
    label: "Email Address",
    placeholder: "john@example.com",
    type: "email",
    full: true,
  },
  {
    key: "phone",
    icon: FaPhone,
    label: "Phone Number",
    placeholder: "+95 9xx xxx xxxx",
    type: "tel",
    full: true,
  },
  {
    key: "country",
    icon: FaGlobe,
    label: "Country",
    placeholder: "Myanmar",
    type: "text",
    full: true,
  },
];

const GuestDetails = ({ form, setField }) => {
  return (
    <Card>
      <CardTitle icon={FaUser}>Guest Details</CardTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {guestFields.map(
          ({ key, icon: Icon, label, placeholder, type, full }) => (
            <div
              key={key}
              className={`space-y-1 sm:space-y-2 ${
                full ? "sm:col-span-2" : ""
              }`}
            >
              <label className="text-xs sm:text-sm text-gray-400">
                {label}
              </label>

              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm" />

                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) =>
                    setField(key, e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-accent transition"
                />
              </div>
            </div>
          )
        )}
      </div>

      <div className="space-y-1 sm:space-y-2">
        <label className="text-xs sm:text-sm text-gray-400">
          Special Request
        </label>

        <textarea
          rows={3}
          value={form.specialRequest}
          onChange={(e) =>
            setField("specialRequest", e.target.value)
          }
          placeholder="Any special requests or notes..."
          className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-accent transition resize-none"
        />
      </div>

      <label
        className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl cursor-pointer border transition duration-200 ${
          form.agreePolicy
            ? "border-accent bg-accent/10"
            : "border-white/10 bg-white/5"
        }`}
      >
        <input
          type="checkbox"
          checked={form.agreePolicy}
          onChange={(e) =>
            setField("agreePolicy", e.target.checked)
          }
          className="accent-accent w-4 h-4 mt-0.5 shrink-0"
        />

        <div>
          <div className="flex items-center gap-2">
            <FaShieldAlt
              className={`text-xs sm:text-sm shrink-0 ${
                form.agreePolicy
                  ? "text-accent"
                  : "text-gray-400"
              }`}
            />

            <p className="text-xs sm:text-sm font-medium">
              I agree to the Hotel Policy
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-1">
            By continuing, you agree to our cancellation
            policy, check-in/check-out times, and terms of
            service.
          </p>
        </div>
      </label>
    </Card>
  );
};

export default GuestDetails;