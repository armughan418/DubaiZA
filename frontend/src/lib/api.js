const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiRequest = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});

  if (options.body !== undefined) headers.set("Content-Type", "application/json");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
    body:
      options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || `Request failed with status ${response.status}.`,
    );
    error.status = response.status;
    throw error;
  }
  return data;
};
