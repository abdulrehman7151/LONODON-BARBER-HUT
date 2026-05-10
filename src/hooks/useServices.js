import { useState, useEffect } from 'react';
import { fetchServices } from '../api/sanity';

/**
 * @returns {{ services: Array, loading: boolean, error: string | null, refetch: () => void }}
 */
export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchServices();
        if (!cancelled) {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message ?? 'Failed to load services');
          setServices([]);
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

  return { services, loading, error, refetch };
}
