import { urlForImage } from '../../sanity/imageUrl';

/**
 * One normalized service for display.
 * @typedef {{ _key: string, name: string, price: string, description: string, imageUrl: string | null, imageAlt: string }} NormalizedService
 */

/**
 * @param {object} props
 * @param {import('@sanity/client').SanityDocument[] | Array} props.services – raw Sanity docs (`name`, `price`, `description`, `image`)
 * @param {NormalizedService[]} props.fallbackItems – when Sanity is empty/unconfigured
 * @param {boolean} props.loading
 * @param {string | null} props.error
 * @param {string} [props.sectionEyebrow]
 * @param {string} [props.sectionTitle]
 */
export function ServicesSection({
  services,
  fallbackItems,
  loading,
  error,
  sectionEyebrow = 'OUR EXPERTISE',
  sectionTitle = 'Premium Services',
}) {
  const normalized =
    Array.isArray(services) && services.length > 0
      ? services.map((s) => ({
          _key: s._id,
          name: s.name,
          price: s.price,
          description: s.description,
          imageUrl: urlForImage(s.image)?.width(800).height(520).quality(85).url() ?? null,
          imageAlt: s.image?.alt || s.name || 'Service photo',
        }))
      : (fallbackItems ?? []);

  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-transparent via-amber-400/5 to-transparent">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <p className="text-amber-400 text-sm tracking-[0.2em]">{sectionEyebrow}</p>
          <h2 className="text-5xl md:text-6xl font-bold">{sectionTitle}</h2>
          {loading && <p className="text-gray-500 text-sm">Loading services…</p>}
          {error && !loading && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {normalized.map((service) => (
            <article
              key={service._key}
              className="group p-8 border border-amber-400/20 rounded-2xl hover:border-amber-400/50 transition-all hover:bg-amber-400/5"
            >
              <div className="mb-4 overflow-hidden rounded-xl border border-amber-400/20 aspect-[4/3] bg-zinc-900">
                {service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    Add a photo in Sanity
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-1">{service.name}</h3>
              {service.price ? (
                <p className="text-amber-400 font-semibold mb-3">{service.price}</p>
              ) : null}
              <p className="text-gray-400">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
