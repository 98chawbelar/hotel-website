// hooks/useSubmitForm.js

export const buildFormData = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value && typeof value === "object" && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== null) {
      formData.append(key, value);
    }
  });

  return formData;
};
