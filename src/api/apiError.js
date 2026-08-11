export class ApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "ApiError";
    this.status = options.status ?? null;
    this.code = options.code ?? null;
    this.details = options.details ?? null;
    this.isNetworkError = options.isNetworkError ?? false;
    this.originalError = options.originalError;
  }
}

const validationMessage = (detail) => {
  if (!Array.isArray(detail)) return null;
  return detail.map((item) => item?.msg).filter(Boolean).join("\n") || null;
};

const asMessage = (value) => {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return null;
};

export const toApiError = (error) => {
  if (error instanceof ApiError) return error;

  const response = error?.response;
  const data = response?.data;
  const isTimeout = error?.code === "ECONNABORTED";
  const message =
    validationMessage(data?.detail) ||
    asMessage(data?.detail) ||
    asMessage(data?.message) ||
    (isTimeout
      ? "The server took too long to process this file. Please try a smaller file."
      : response
      ? `Request failed with status ${response.status}.`
      : "Unable to reach the server. Check your connection and try again.");

  return new ApiError(message, {
    status: response?.status,
    code: error?.code,
    details: data?.detail ?? data ?? null,
    isNetworkError: !response,
    originalError: error,
  });
};

export const getErrorMessage = (error, fallback = "Something went wrong.") =>
  asMessage(error?.message) || String(fallback);
