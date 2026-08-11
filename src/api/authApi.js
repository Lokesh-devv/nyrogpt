import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";
import tokenStorage from "./tokenStorage";

const dataOf = (request) => request.then((response) => response.data);

export const getCurrentUser = () => dataOf(apiClient.get(ENDPOINTS.auth.me));

export const emailLogin = (email, fullName) =>
  dataOf(apiClient.post(ENDPOINTS.auth.emailLogin, { email, full_name: fullName }));

export const login = emailLogin;

export const logout = async () => {
  try {
    return await dataOf(apiClient.post(ENDPOINTS.auth.logout));
  } finally {
    await tokenStorage.clearTokens();
  }
};

export const getGoogleLogin = () => dataOf(apiClient.get(ENDPOINTS.auth.googleLogin));
export const getGoogleCallback = (params) =>
  dataOf(apiClient.get(ENDPOINTS.auth.googleCallback, { params }));
export const getBackendGoogleLogin = () =>
  dataOf(apiClient.get(ENDPOINTS.auth.backendGoogleLogin));
export const getBackendGoogleCallback = (params) =>
  dataOf(apiClient.get(ENDPOINTS.auth.backendGoogleCallback, { params }));

export const passwordLogin = async () => {
  throw new Error("TODO: Password login endpoint is not documented.");
};

export default {
  getCurrentUser,
  login,
  emailLogin,
  logout,
  getGoogleLogin,
  getGoogleCallback,
  getBackendGoogleLogin,
  getBackendGoogleCallback,
  passwordLogin,
};
