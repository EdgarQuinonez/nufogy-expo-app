import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";
import useAsync from "@utils/useAsync";

interface FetchOptions extends AxiosRequestConfig {
  // You can add any custom fetch options here if needed
}

const DEFAULT_OPTIONS: FetchOptions = {
  headers: { "Content-Type": "application/json" },
};

export default function useFetch<T>(
  url: string,
  options: FetchOptions = {},
  dependencies: any[] = []
) {
  return useAsync<T>(async () => {
    try {
      const response = await axios(url, { ...DEFAULT_OPTIONS, ...options });
      return response.data as T; // Type-cast response data
    } catch (error: any) {
      // Handle Axios errors (e.g., network errors, server errors)
      if (axios.isAxiosError(error)) {
        throw new Error(error.message); // Rethrow the Axios error message
      } else {
        // Handle other unexpected errors
        throw error;
      }
    }
  }, dependencies);
}
