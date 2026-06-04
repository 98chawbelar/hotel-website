import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white/5 rounded-2xl p-4 sm:p-6 space-y-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ icon: Icon, children }) => (
  <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
    {Icon && <Icon className="text-accent shrink-0" />}
    {children}
  </h2>
);