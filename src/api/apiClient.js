import axios from "axios";
import { API_CONFIG } from "./apiConfig";
import { toApiError } from "./apiError";
import tokenStorage from "./tokenStorage";

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const redactHeaders = (headers = {}) => {
  const nextHeaders =
    typeof headers.toJSON === "function" ? headers.toJSON() : { ...headers };

  if (nextHeaders.Authorization) {
    nextHeaders.Authorization = "Bearer <redacted>";
  }

  if (nextHeaders.authorization) {
    nextHeaders.authorization = "Bearer <redacted>";
  }

  return nextHeaders;
};

const getFullUrl = (config = {}) => {
  const baseURL = config.baseURL || "";
  const url = config.url || "";

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${baseURL.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
};

const logApiRequest = (config) => {
  if (!__DEV__) return;

  console.log("[API Request]", {
    baseURL: config.baseURL,
    fullURL: getFullUrl(config),
    method: config.method?.toUpperCase(),
    url: config.url,
    headers: redactHeaders(config.headers),
    params: config.params,
    body: config.data,
  });
};

const logApiResponse = (response) => {
  if (!__DEV__) return;

  console.log("[API Response]", {
    baseURL: response.config?.baseURL,
    fullURL: getFullUrl(response.config),
    method: response.config?.method?.toUpperCase(),
    url: response.config?.url,
    status: response.status,
    body: response.data,
  });
};

const logApiError = (error) => {
  if (!__DEV__) return;

  if (error.response) {
    console.log("[API Error Response]", {
      baseURL: error.config?.baseURL,
      fullURL: getFullUrl(error.config),
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      status: error.response.status,
      headers: redactHeaders(error.config?.headers),
      requestBody: error.config?.data,
      responseBody: error.response.data,
    });
    return;
  }

  if (error.request) {
    console.log("[API Network Error]", {
      baseURL: error.config?.baseURL,
      fullURL: getFullUrl(error.config),
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      headers: redactHeaders(error.config?.headers),
      requestBody: error.config?.data,
      message: error.message,
    });
    return;
  }

  console.log("[API Error]", {
    message: error.message,
  });
};

apiClient.interceptors.request.use(
  async (config) => {
    const token = await tokenStorage.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    logApiRequest(config);

    return config;
  },
  (error) => Promise.reject(toApiError(error))
);

apiClient.interceptors.response.use(
  (response) => {
    logApiResponse(response);
    return response;
  },
  async (error) => {
    logApiError(error);

    if (error.response?.status === 401) {
      await tokenStorage.clearTokens();
    }

    return Promise.reject(toApiError(error));
  }
);

export default apiClient;
