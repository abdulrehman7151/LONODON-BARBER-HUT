import imageUrlBuilder from '@sanity/image-url';
import { isSanityConfigured, sanityClient } from './sanityClient';

/**
 * Build a Sanity image URL helper (null if CMS is not configured or image missing).
 */
export function urlForImage(source) {
  if (!isSanityConfigured || !source?.asset) return null;
  return imageUrlBuilder(sanityClient).image(source).auto('format').fit('max');
}
