import { ChatBubbleIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Customer review',
  type: 'document',
  icon: ChatBubbleIcon,
  groups: [{ name: 'review', title: 'Review', default: true }],
  fields: [
    defineField({
      name: 'name',
      title: 'Customer name',
      type: 'string',
      group: 'review',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'review',
      title: 'What they said',
      type: 'text',
      rows: 5,
      group: 'review',
      validation: (rule) => rule.required().max(1200),
    }),
    defineField({
      name: 'rating',
      title: 'Star rating',
      type: 'number',
      group: 'review',
      validation: (rule) => rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'review', rating: 'rating' },
    prepare({ title, subtitle, rating }) {
      return {
        title,
        subtitle: `${rating ?? '—'}★ · ${subtitle?.slice(0, 60) ?? ''}${subtitle?.length > 60 ? '…' : ''}`,
      };
    },
  },
});
