export const API_CONFIG = Object.freeze({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://16.16.216.155:8000",
  timeout: 30000,
});

export default API_CONFIG;
