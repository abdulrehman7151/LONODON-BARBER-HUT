import { sanityClient, isSanityConfigured } from '../sanity/sanityClient';

async function safeFetch(query, params = {}) {
  if (!isSanityConfigured) {
    return null;
  }
  return sanityClient.fetch(query, params);
}

const serviceFields = `
  _id,
  name,
  price,
  description,
  image
`;

const teamFields = `
  _id,
  name,
  role,
  image
`;

const testimonialFields = `
  _id,
  name,
  review,
  rating
`;

const homepageFields = `
  _id,
  heroTitle,
  heroSubtitle,
  bannerImage
`;

const galleryFields = `
  _id,
  images
`;

/**
 * All services, ordered for the website.
 */
export async function fetchServices() {
  const query = `
    *[_type == "service"] | order(name asc) {
      ${serviceFields}
    }
  `;
  return safeFetch(query);
}

/**
 * All team members.
 */
export async function fetchTeam() {
  const query = `
    *[_type == "teamMember"] | order(name asc) {
      ${teamFields}
    }
  `;
  return safeFetch(query);
}

/**
 * Singleton gallery document (fixed id: gallery).
 */
export async function fetchGallery() {
  const query = `
    *[_type == "gallery"][0] {
      ${galleryFields}
    }
  `;
  return safeFetch(query);
}

/**
 * Published testimonials.
 */
export async function fetchTestimonials() {
  const query = `
    *[_type == "testimonial"] | order(name asc) {
      ${testimonialFields}
    }
  `;
  return safeFetch(query);
}

/**
 * Singleton homepage (fixed id: homepage).
 */
export async function fetchHomepage() {
  const query = `
    *[_type == "homepage"][0] {
      ${homepageFields}
    }
  `;
  return safeFetch(query);
}
