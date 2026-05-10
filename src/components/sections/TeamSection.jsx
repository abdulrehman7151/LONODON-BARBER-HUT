import { urlForImage } from '../../sanity/imageUrl';

/**
 * @param {object} props
 * @param {import('@sanity/client').SanityDocument[]} props.members
 * @param {{ _key: string, name: string, role: string, imageUrl: string | null, imageAlt: string }[]} props.fallbackItems
 * @param {boolean} props.loading
 * @param {string | null} props.error
 * @param {string} [props.sectionEyebrow]
 * @param {string} [props.sectionTitle]
 */
export function TeamSection({
  members,
  fallbackItems,
  loading,
  error,
  sectionEyebrow = 'OUR TEAM',
  sectionTitle = 'Expert Barbers',
}) {
  const normalized =
    Array.isArray(members) && members.length > 0
      ? members.map((m) => ({
          _key: m._id,
          name: m.name,
          role: m.role,
          imageUrl: urlForImage(m.image)?.width(700).height(640).quality(85).url() ?? null,
          imageAlt: m.image?.alt || m.name || 'Team photo',
        }))
      : fallbackItems;

  return (
    <section id="team" className="relative py-24 bg-gradient-to-b from-amber-400/5 to-transparent">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <p className="text-amber-400 text-sm tracking-[0.2em]">{sectionEyebrow}</p>
          <h2 className="text-5xl md:text-6xl font-bold">{sectionTitle}</h2>
          {loading && <p className="text-gray-500 text-sm">Loading team…</p>}
          {error && !loading && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {normalized.map((barber) => (
            <article key={barber._key} className="group">
              <div className="bg-gradient-to-br from-amber-400/20 to-black border border-amber-400/30 rounded-2xl p-8 text-center hover:border-amber-400/60 transition-all h-full flex flex-col">
                <div className="mb-4 overflow-hidden rounded-xl border border-amber-400/20 aspect-[4/5] bg-zinc-900">
                  {barber.imageUrl ? (
                    <img
                      src={barber.imageUrl}
                      alt={barber.imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                      Add a photo in Sanity
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">{barber.name}</h3>
                <p className="text-amber-400 text-sm">{barber.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
