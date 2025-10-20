import { useCallback, useEffect, useState } from "react";

export interface UseFetchDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useFetchData<T>(url: string): UseFetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`An error occurred! Code: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An unknown error occurred"));
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch };
}

export default useFetchData;
