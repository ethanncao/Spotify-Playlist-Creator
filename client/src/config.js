export const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "https://tune-pilot.onrender.com";

export const api = (path, options = {}) => fetch(`${API_BASE}${path}`, options);
