import { useState, useEffect } from 'react';
import { fetchTestimonials } from '../api/sanity';

/**
 * @returns {{ testimonials: Array, loading: boolean, error: string | null, refetch: () => void }}
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTestimonials();
        if (!cancelled) {
          setTestimonials(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message ?? 'Failed to load testimonials');
          setTestimonials([]);
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

  return { testimonials, loading, error, refetch };
}
