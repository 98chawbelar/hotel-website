// hooks/useForm.js

import { useState } from "react";

export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files?.[0] || value,
    }));
  };

  return {
    formData,
    setFormData,
    handleChange,
  };
};
