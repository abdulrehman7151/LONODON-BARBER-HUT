import { useState, useEffect } from 'react';
import { fetchHomepage } from '../api/sanity';

/**
 * Singleton homepage hero content.
 * @returns {{ homepage: object | null, loading: boolean, error: string | null, refetch: () => void }}
 */
export function useHomepage() {
  const [homepage, setHomepage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHomepage();
        if (!cancelled) {
          setHomepage(data && typeof data === 'object' ? data : null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message ?? 'Failed to load homepage');
          setHomepage(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [version]);

  const refetch = () => setVersion((v) => v + 1);

  return { homepage, loading, error, refetch };
}
