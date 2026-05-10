import { createClient } from '@sanity/client';

/**
 * Vite env: set in `.env` as VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET
 * @see https://www.sanity.io/docs/js-client
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2024-01-01';

export const isSanityConfigured = Boolean(projectId);

/** Use in app only when projectId is set */
export const sanityClient = createClient({
  projectId: projectId ?? 'missing-project-id',
  dataset,
  apiVersion,
  useCdn: import.meta.env.PROD,
});
