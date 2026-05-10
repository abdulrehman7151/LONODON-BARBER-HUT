import { useState, useEffect } from 'react';
import { fetchTeam } from '../api/sanity';

/**
 * @returns {{ team: Array, loading: boolean, error: string | null, refetch: () => void }}
 */
export function useTeam() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTeam();
        if (!cancelled) {
          setTeam(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message ?? 'Failed to load team');
          setTeam([]);
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

  return { team, loading, error, refetch };
}
