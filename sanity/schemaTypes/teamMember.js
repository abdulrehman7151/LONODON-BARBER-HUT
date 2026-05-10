import { UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  icon: UserIcon,
  groups: [{ name: 'profile', title: 'Profile', default: true }],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      description: 'Example: Master barber, Fade specialist',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      group: 'profile',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Image description (for accessibility)',
          validation: (rule) => rule.max(120),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'image' },
  },
});
