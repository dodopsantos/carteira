import { useState, useEffect } from 'react';
import { getServerStatus, ServerStatus } from '@services/server';

type UseServerStatusResult = {
  status: ServerStatus | null;
  loading: boolean;
  error: boolean;
};

const POLL_INTERVAL_MS = 30_000;

export function useServerStatus(): UseServerStatusResult {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      try {
        const data = await getServerStatus();
        if (!cancelled) {
          setStatus(data);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    const interval = setInterval(fetch, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { status, loading, error };
}
