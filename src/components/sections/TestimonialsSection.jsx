import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * @param {object} props
 * @param {{ _id?: string, name: string, review: string, rating?: number }[]} props.items – Sanity testimonials (rating 1–5)
 * @param {{ _key?: string, name: string, review: string, image?: string | null }[]} props.fallbackItems – legacy shape with optional image avatar
 * @param {boolean} props.loading
 * @param {string | null} props.error
 */

function RatingStars({ value }) {
  const n = typeof value === 'number' ? Math.min(5, Math.max(1, Math.round(value))) : 5;
  return (
    <div className="flex gap-1 justify-center mb-6">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={20}
          className={i < n ? 'fill-amber-400 text-amber-400' : 'text-amber-400/25'}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ items, fallbackItems, loading, error }) {
  const normalized =
    Array.isArray(items) && items.length > 0
      ? items.map((t) => ({
          _key: t._id,
          name: t.name,
          review: t.review,
          rating: typeof t.rating === 'number' ? t.rating : 5,
          imageUrl: null,
        }))
      : (fallbackItems ?? []).map((t, i) => ({
          _key: t._key ?? `fb-${i}`,
          name: t.name,
          review: t.review,
          rating: 5,
          imageUrl: t.image ?? null,
        }));

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex((i) => (normalized.length ? Math.min(i, normalized.length - 1) : 0));
  }, [normalized.length]);

  useEffect(() => {
    if (!normalized.length) return undefined;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % normalized.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [normalized.length]);

  const current = normalized[index];
  const next = () => normalized.length && setIndex((i) => (i + 1) % normalized.length);
  const prev = () =>
    normalized.length && setIndex((i) => (i - 1 + normalized.length) % normalized.length);

  if (!normalized.length && !loading) {
    return null;
  }

  return (
    <section className="relative py-24">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <p className="text-amber-400 text-sm tracking-[0.2em]">CLIENT REVIEWS</p>
          <h2 className="text-5xl md:text-6xl font-bold">What Our Clients Say</h2>
          {loading && <p className="text-gray-500 text-sm">Loading reviews…</p>}
          {error && !loading && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        {normalized.length > 0 && current && (
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-400/20 to-black border border-amber-400/30 rounded-2xl p-12 text-center">
              <RatingStars value={current.rating} />
              <blockquote className="text-2xl text-gray-300 mb-8 italic">
                "{current.review}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                {current.imageUrl ? (
                  <img
                    src={current.imageUrl}
                    alt={current.name}
                    className="w-16 h-16 rounded-full object-cover border border-amber-400/40"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold">
                    {(current.name || '?').slice(0, 1)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-lg">{current.name}</p>
                  <p className="text-amber-400 text-sm">Verified Client</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={prev}
                className="bg-amber-400/20 hover:bg-amber-400/40 border border-amber-400/30 rounded-full p-3 transition-all"
                aria-label="Previous review"
              >
                <ChevronLeft size={24} className="text-amber-400" />
              </button>
              <div className="flex items-center gap-2">
                {normalized.map((_, i) => (
                  <button
                    key={normalized[i]._key}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? 'bg-amber-400 w-8' : 'bg-amber-400/30 w-2'
                    }`}
                    aria-label={`Review ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="bg-amber-400/20 hover:bg-amber-400/40 border border-amber-400/30 rounded-full p-3 transition-all"
                aria-label="Next review"
              >
                <ChevronRight size={24} className="text-amber-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
