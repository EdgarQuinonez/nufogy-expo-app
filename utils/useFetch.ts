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
      return response.data as T;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  }, dependencies);
}
