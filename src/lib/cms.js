import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/** Fallback JSON when Sanity + Supabase are not configured yet */
export const defaultSiteContent = {
  heroImage: 'https://picsum.photos/seed/classy-hero/1000/1200',
  shopAddress: '1560 Dundas St, London, ON N5W 3C1, Canada',
  phone: '+1 (519) 451-234',
  email: 'hello@classybarbershop.com',
  hoursHtml: 'Mon-Fri: 10AM - 8PM<br/>Sat-Sun: 10AM - 6PM',
  services: [
    {
      title: 'Classic Cuts',
      desc: 'Precision haircuts tailored to your look and lifestyle.',
      image: 'https://picsum.photos/seed/service-cut/600/400',
    },
    {
      title: 'Beard Grooming',
      desc: 'Beard shaping, lineups, and premium beard care.',
      image: 'https://picsum.photos/seed/service-beard/600/400',
    },
    {
      title: 'Luxury Treatments',
      desc: 'Relaxing wash, scalp care, and finishing treatments.',
      image: 'https://picsum.photos/seed/service-spa/600/400',
    },
  ],
  team: [
    {
      name: 'Aadil',
      specialty: 'Master Barber',
      exp: '10 years',
      image: 'https://picsum.photos/seed/barber-1/500/600',
    },
    {
      name: 'Kash',
      specialty: 'Fade Specialist',
      exp: '8 years',
      image: 'https://picsum.photos/seed/barber-2/500/600',
    },
    {
      name: 'Mannu',
      specialty: 'Beard Expert',
      exp: '12 years',
      image: 'https://picsum.photos/seed/barber-3/500/600',
    },
  ],
  gallery: Array.from(
    { length: 8 },
    (_, i) => `https://picsum.photos/seed/classy-gallery-${i + 1}/900/700`
  ),
  pricing: [
    {
      service: 'Classic Haircut',
      price: '$35',
      featured: false,
      features: ['Professional Cut', 'Hot Towel', 'Hair Wash'],
    },
    {
      service: 'Premium Fade',
      price: '$45',
      featured: false,
      features: ['Expert Fade', 'Beard Trim', 'Scalp Massage', 'Styling'],
    },
    {
      service: 'Deluxe Package',
      price: '$75',
      featured: true,
      features: [
        'Full Grooming',
        'Beard Design',
        'Facial Treatment',
        'Head Massage',
        'Premium Styling',
      ],
    },
  ],
  testimonials: [
    {
      name: 'Dinesh.',
      review:
        'Great experience! I got my haircut and beard done here and I am very happy.',
      image: 'https://picsum.photos/seed/client-1/200/200',
    },
    {
      name: 'Lovepreet Singh.',
      review: 'Mannu is absolutely phenomenal! Highly recommend.',
      image: 'https://picsum.photos/seed/client-2/200/200',
    },
    {
      name: 'Sohit Khokhar',
      review: 'Friendly staff and a really good experience. I will definitely be coming back.',
      image: 'https://picsum.photos/seed/client-3/200/200',
    },
  ],
};

const SITE_CONTENT_ID = 'main';

export async function getSiteContent() {
  if (!supabase) return defaultSiteContent;
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', SITE_CONTENT_ID)
      .single();
    if (error || !data?.content) return defaultSiteContent;
    return { ...defaultSiteContent, ...data.content };
  } catch {
    return defaultSiteContent;
  }
}

export async function createBooking(payload) {
  if (!supabase) return;
  await supabase.from('bookings').insert(payload);
}
