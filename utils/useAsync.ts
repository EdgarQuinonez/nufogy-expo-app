import { useState, useEffect, useCallback } from "react";

interface AsyncState<T> {
  loading: boolean;
  error?: Error;
  value?: T;
}

export default function useAsync<T>(
  callback: () => Promise<T>,
  dependencies: any[] = []
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    loading: true,
  });

  const callbackMemoized = useCallback(async () => {
    setState({ loading: true });
    try {
      const result = await callback();
      setState({ loading: false, value: result });
    } catch (error: any) {
      setState({ loading: false, error: error as Error });
    }
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return state;
}
