import { urlForImage } from '../../sanity/imageUrl';

/**
 * @param {object} props
 * @param {{ images?: unknown[] } | null} props.gallery – Sanity gallery singleton
 * @param {string[]} props.fallbackUrls
 * @param {boolean} props.loading
 * @param {string | null} props.error
 */
export function GallerySection({ gallery, fallbackUrls, loading, error }) {
  const fromSanity =
    gallery?.images?.map((img, i) => ({
      key: `${gallery._id}-img-${i}`,
      url: urlForImage(img)?.width(900).height(700).quality(85).url() ?? null,
      alt: img?.alt ?? `Gallery ${i + 1}`,
    })) ?? [];

  const urlsToShow =
    fromSanity.length > 0 && fromSanity.some((x) => x.url)
      ? fromSanity
      : fallbackUrls.map((url, i) => ({
          key: `fallback-${i}`,
          url,
          alt: `Barber style ${i + 1}`,
        }));

  return (
    <section id="gallery" className="relative py-24 bg-gradient-to-b from-transparent via-amber-400/5 to-transparent">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <p className="text-amber-400 text-sm tracking-[0.2em]">OUR WORK</p>
          <h2 className="text-5xl md:text-6xl font-bold">Gallery</h2>
          {loading && <p className="text-gray-500 text-sm">Loading gallery…</p>}
          {error && !loading && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {urlsToShow.map((item, i) => (
            <div
              key={item.key}
              className="group relative overflow-hidden rounded-xl bg-amber-400/10 border border-amber-400/20 hover:border-amber-400/60 transition-all h-48"
            >
              {item.url ? (
                <img
                  src={item.url}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                  Missing image URL
                </div>
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/60 flex items-center justify-center transition-all">
                <span className="text-white font-bold">Style #{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
