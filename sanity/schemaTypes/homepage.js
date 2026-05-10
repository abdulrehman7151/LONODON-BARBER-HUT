import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [{ name: 'hero', title: 'Hero section', default: true }],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Main headline',
      description: 'The big text at the top of your site.',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Supporting line',
      description: 'Short paragraph under the headline.',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner image',
      description: 'Large image on the right side of the hero.',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Image description (for accessibility)',
          validation: (rule) => rule.max(120),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage', subtitle: 'Hero banner & headline' };
    },
  },
});
