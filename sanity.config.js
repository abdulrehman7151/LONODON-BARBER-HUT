import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { deskStructure } from './sanity/deskStructure';
import { schemaTypes } from './sanity/schemaTypes';

/**
 * Sanity Studio — run locally with `npm run studio`.
 * Set SANITY_STUDIO_PROJECT_ID + SANITY_STUDIO_DATASET in `.env` (see SANITY_SETUP.md).
 */
export default defineConfig({
  name: 'barber-website',
  title: 'Barber Website',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [structureTool({ structure: deskStructure })],

  schema: {
    types: schemaTypes,
  },
});
