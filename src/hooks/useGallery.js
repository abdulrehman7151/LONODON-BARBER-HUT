import { useState, useEffect } from 'react';
import { fetchGallery } from '../api/sanity';

/**
 * @returns {{ gallery: { _id: string, images: unknown[] } | null, loading: boolean, error: string | null, refetch: () => void }}
 */
export function useGallery() {
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchGallery();
        if (!cancelled) {
          setGallery(data && typeof data === 'object' ? data : null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message ?? 'Failed to load gallery');
          setGallery(null);
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

  return { gallery, loading, error, refetch };
}
