import { Dispatch, SetStateAction } from "react";

export type FetchReactState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};
export type FetchState<T> = {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
  refetch: () => Promise<void>;
  cancelRequest: () => void;
};

interface RequestOptions extends RequestInit {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  // headers?: Record<string, string>;
  // body?: unknown;
}

type Config<T> = {
  url: string;
  options?: RequestOptions;
  reactStateSetter?: Dispatch<SetStateAction<FetchReactState<T> | undefined>>;
};

async function apiFetch<T>({
  url,
  options = {},
  reactStateSetter,
}: Config<T>): Promise<FetchState<T>> {
  let isLoading = true;
  let data: T | null = null;
  let error: Error | null = null;
  let abortController: AbortController | null = null;

  const fetchData = async (): Promise<void> => {
    isLoading = true;
    // Create a new AbortController for this request
    abortController = new AbortController();
    const signal = abortController.signal;
    if (reactStateSetter) {
      reactStateSetter({ isLoading, data, error });
    }
    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      data = (await response.json()) as T;
      error = null;
      if (reactStateSetter) {
        reactStateSetter({ isLoading, data, error });
      }
    } catch (err) {
      error = err as Error;
      data = null;
      if (reactStateSetter) {
        reactStateSetter({ isLoading, data, error });
      }
    } finally {
      isLoading = false;
      abortController = null;
      if (reactStateSetter) {
        reactStateSetter({ isLoading, data, error });
      }
    }
  };

  // Call fetchData initially
  await fetchData();

  return {
    isLoading,
    data,
    error,
    refetch: fetchData,
    cancelRequest: () => {
      abortController?.abort();
    },
  };
}

export const api = {
  get: <T>({ url, options = {}, reactStateSetter }: Config<T>) =>
    apiFetch<T>({
      url,
      options: { ...options, method: "GET" },
      reactStateSetter,
    }),
  post: <T>({ url, options = {}, reactStateSetter }: Config<T>) =>
    apiFetch<T>({
      url,
      options: { ...options, method: "POST" },
      reactStateSetter,
    }),
  put: <T>({ url, options = {}, reactStateSetter }: Config<T>) =>
    apiFetch<T>({
      url,
      options: { ...options, method: "PUT" },
      reactStateSetter,
    }),
  delete: <T>({ url, options = {}, reactStateSetter }: Config<T>) =>
    apiFetch<T>({
      url,
      options: { ...options, method: "DELETE" },
      reactStateSetter,
    }),
};
