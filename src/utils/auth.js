const ADMIN_KEY = "admin";
const TOKEN_KEY = "token";

export const getAdmin = () => {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_KEY));
  } catch {
    return null;
  }
};

export const setAdmin = (admin) => {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

export const clearAdmin = () => {
  localStorage.removeItem(ADMIN_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
