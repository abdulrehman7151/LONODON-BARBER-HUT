import { ImagesIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gallery',
  title: 'Photo gallery',
  type: 'document',
  icon: ImagesIcon,
  groups: [{ name: 'photos', title: 'Photos', default: true }],
  fields: [
    defineField({
      name: 'images',
      title: 'Gallery photos',
      description: 'Add or reorder photos. Drag rows to change order.',
      type: 'array',
      group: 'photos',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Short description (optional)',
              validation: (rule) => rule.max(120),
            }),
          ],
        },
      ],
      validation: (rule) => rule.max(50),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Photo gallery', subtitle: 'Your work & shop photos' };
    },
  },
});
