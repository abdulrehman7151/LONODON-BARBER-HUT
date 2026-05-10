import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: TagIcon,
  groups: [
    { name: 'content', title: 'What clients see', default: true },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Service name',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      description: 'Example: $35 or From $25',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      group: 'content',
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
    select: { title: 'name', subtitle: 'price', media: 'image' },
  },
});
