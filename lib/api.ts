import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiError {
  detail?: string;
  field?: string;
}

export interface ApiResponse<T> {
  data: T;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    // Always convert headers to AxiosHeaders to avoid type error
    config.headers = AxiosHeaders.from(config.headers || {});

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export interface RequestOptions<TRequest = undefined, TParams = undefined>
  extends AxiosRequestConfig {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: TRequest;
  params?: TParams;
  headers?: Record<string, string>;
}

export async function request<
  TRequest = undefined,
  TResponse = unknown,
  TParams = undefined
>({
  endpoint,
  method = "GET",
  data,
  params,
  headers,
}: RequestOptions<TRequest, TParams>): Promise<TResponse> {
  try {
    const response: AxiosResponse<TResponse> = await api.request<TResponse>({
      url: endpoint,
      method,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw { detail: error.message } as ApiError;
    }
    throw { detail: "An unexpected error occurred" } as ApiError;
  }
}

export default api;
